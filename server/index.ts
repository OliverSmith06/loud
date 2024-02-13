import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import { Pool } from 'pg';
import path from 'path';
import multer from 'multer';
import { Dance } from './models/Dance';
import { Video } from './models/Video';
import { dbPassword } from './secrets/dbAuth';
import { masterUsername, masterPassword } from './secrets/websiteLogin';
import { poolConfig } from './secrets/dbConfig';
import jwt from 'jsonwebtoken';
import ffmpeg from 'fluent-ffmpeg';
import { exec } from 'child_process';
import sharp from 'sharp';

dotenv.config();

const headers: Headers = new Headers()

headers.set('Content-Type', 'application/json')
headers.set('Accept', 'application/json')
headers.set('X-Custom-Header', 'CustomValue')
ffmpeg.setFfmpegPath(require('@ffmpeg-installer/ffmpeg').path);
ffmpeg.setFfprobePath(require('@ffprobe-installer/ffprobe').path);

const app: Express = express();
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

const pool = new Pool(poolConfig);

function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, "RANDOM-TOKEN", (err: any, user: any) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

app.get("/protected", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Authenticated endpoint accessed successfully" });
});

app.post("/login", (req, res) => {
  const user = masterUsername;
  const password = masterPassword;
  const inputUsername = req.body.username;
  const inputPassword = req.body.password;

  if (user !== inputUsername || password !== inputPassword) {
    res.status(400).json({message: "username or password does not match"})
    return;
  }

  const token = jwt.sign({ username: user }, "RANDOM-TOKEN", { expiresIn: '1h' });

  res.status(200).json({ token });
})

app.get('/getDances', (req: Request, res: Response) => {
  pool.query('SELECT * FROM dances ORDER BY id ASC', (error: any, results: any) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
});

app.get('/random-frame/:filename', async (req: Request, res: Response) => {
  try {
    const videoPath = `./uploads/${req.params.filename}`;
    const id = req.params.filename.split('.')[0]
    const tempImagePath = `./${id}-temp.jpg`;

    // Get the duration of the video
    const { duration } = await new Promise<any>((resolve, reject) => {
      ffmpeg.ffprobe(videoPath, (err, metadata) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(metadata.format);
      });
    });

    // // Generate a random time within the duration of the video
    const randomTime = Math.random() * duration;

    // Extract a frame at the random time
    await new Promise<void>((resolve, reject) => {
      ffmpeg(videoPath)
        .seekInput(0)
        .frames(1)
        .output(tempImagePath)
        .on('end', () => resolve())
        .on('error', (err) => reject(err))
        .run();
    });

    // Read the temporary image file
    const image = fs.readFileSync(tempImagePath);

    // Send the temporary image in the response
    res.set('Content-Type', 'image/jpeg');
    res.send(image);

    // Delete the temporary image file
    fs.unlinkSync(tempImagePath);
  } catch (e) {
    console.error('Error:', e);
    res.status(500).send('Failed to extract random frame');
  }
});

app.delete('/deleteVideo', async(req: Request, res: Response) => {
  try {
    const videoId = req.query.id
    const values = [videoId]

    const findDance = 'SELECT dance FROM videos WHERE id = $1';
    const findDanceRes = await pool.query(findDance, values);
    const danceId = findDanceRes.rows[0].dance;

    const query = 'DELETE FROM videos WHERE id = $1';
    await pool.query(query, values);

    const findVideos = 'SELECT id FROM videos WHERE dance = $1 ORDER BY "order" ASC';
    const findVideosRes = await pool.query(findVideos, [danceId]);
    const videoIds = findVideosRes.rows.map(item => parseInt(item.id, 10))

    videoIds.forEach((value: number, index: number) => {
      const updateOrder = 'UPDATE videos SET "order" = $1 WHERE dance = $2 AND "id" = $3';
      pool.query(updateOrder, [index + 1, danceId, value], (error, results) => {
        if (error) {
          throw error;
        }
      })
    })

    res.status(200).json({message: `Video deleted successfully (id: ${videoId})`})
  } catch (error) {
    console.error('Error creating video:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/addTestDance', (req: Request, res: Response) => {
  const { name, email } = req.body;

  pool.query('INSERT INTO dances (name, "desc", dance_order) VALUES ($1, $2, $3) RETURNING *', [["Drama - Aespa"], ["first dance learning"], "0"], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
});

app.post('/createVideo', async (req: Request, res: Response) => {
  try {
    const newVideo: Video = req.body;

    const query = `
      INSERT INTO videos (dance, "order", "date", "name", "desc", "video_type")
      SELECT $1, COALESCE((SELECT COUNT(*) FROM videos WHERE dance = $1), 0) + 1, $2, $3, $4, $5
      RETURNING *
    `;
    const values = [newVideo.dance, newVideo.date, newVideo.name, newVideo.desc, newVideo.video_type];

    const result = await pool.query(query, values);
    const insertedVideo = result.rows[0]; // Assuming only one row is returned

    res.status(201).json({ message: 'Video added successfully', video: insertedVideo });
  } catch (error) {
    console.error('Error creating video:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/createDance', (req: Request, res: Response) => {
  const newDance: Dance = req.body;

  pool.query('INSERT INTO dances (name, "desc", dance_order) VALUES ($1, $2, $3) RETURNING *', [newDance.name, newDance.desc, newDance.dance_order], (error, results) => {
    if (error) {
      console.log(error)
      throw error
    }
    res.status(201).send({ message: 'Dance added successfully', dance: newDance })
  })
});

app.get('/dances', (req: Request, res: Response) => {
  pool.query('SELECT * FROM dances ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json({ dances: results.rows }); // Send the database results in the response
  });
});

app.put('/updateOrdering', async (req: Request, res: Response) => {
  const { initialOrdering, orderItems, danceId } = req.body;
  const query = 'SELECT id FROM videos WHERE dance = $1 ORDER BY "order" ASC';
  pool.query(query, [danceId], (error, results) => {
    if (error) {
      throw error;
    }
    orderItems.forEach((value: number, index: number) => {
      const query = 'UPDATE videos SET "order" = $1 WHERE dance = $2 AND "id" = $3';
      pool.query(query, [index + 1, danceId, results.rows[value-1].id], (error, results) => {
        if (error) {
          throw error;
        }
      })
    })
  })
  
    res.status(201).send({ message: 'Order updated!' })
})

app.get('/videos', async (req: Request, res: Response) => {
  try {
    const dance = req.query.dance; // Ensure dance is a string
    // console.log(dance)
    const query = 'SELECT * FROM videos WHERE dance = $1 ORDER BY "order" ASC';
    const { rows } = await pool.query(query, [dance]);
    res.status(200).json({ videos: rows }); // Send the database results in the response
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/video', async (req: Request, res: Response) => {
  try {
    const danceId = req.query.danceId;
    const orderId = req.query.orderId;
    const query = 'SELECT * FROM videos WHERE dance = $1 AND "order" = $2';
    const { rows } = await pool.query(query, [danceId, orderId]);
    res.status(200).json({ video: rows }); // Send the database results in the response
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

interface RequestItem {
  req: any; // Replace 'any' with the actual type of your request object
  res: any; // Replace 'any' with the actual type of your response object
  videoPath: string;
}

const requestQueue: RequestItem[] = [];
const queuedFiles = new Set<string>();
let isProcessing = false;

app.get('/clearFileQueue', (req, res) => {
  queuedFiles.clear();
  isProcessing = false;
  console.log("CLEARED")
  res.status(200).json({message: "CLEARED"})
})

app.get('/video-tmep/:filename', (req, res) => {
  const videoPath = path.join(__dirname, '..', 'uploads', req.params.filename);
  
  // Check if the video file exists
  if (!fs.existsSync(videoPath)) {
    return res.status(404).send('Video not found');
  }

  const fileExtension = req.params.filename.split(".").pop();

  // Set the content type for the response
  res.setHeader('Content-Type', `video/${fileExtension}`);

  // Create a readable stream from the video file
  const videoStream = fs.createReadStream(videoPath);

  // Pipe the video stream to the response
  videoStream.pipe(res);

  // Handle errors
  videoStream.on('error', (err) => {
    console.error('Error streaming video:', err);
    res.status(500).send('Internal server error');
  });
});

app.get('/video/:filename', (req, res) => {
  const videoPath = path.join(__dirname, '..', 'uploads', req.params.filename);
  let fileExtension = req.params.filename.split(".").pop();
  if (fileExtension === 'mov') {
    fileExtension = 'quicktime'
  }
  const videoStat = fs.statSync(videoPath);
  const fileSize = videoStat.size;
  const videoRange = req.headers.range;
  console.log("TEST")
  if (videoRange) {
      const parts = videoRange.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1]
          ? parseInt(parts[1], 10)
          : fileSize-1;
      const chunksize = (end-start) + 1;
      const file = fs.createReadStream(videoPath, {start, end});
      const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': `video/${fileExtension}`,
      };
      res.writeHead(206, head);
      file.pipe(res);
  } else {
      const head = {
          'Content-Length': fileSize,
          'Content-Type': `video/${fileExtension}`,
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
  }
});

app.get('/videoOld/:filename', (req, res) => {
  console.log(queuedFiles)
  console.log()
  const videoPath = path.join(__dirname, '..', 'uploads', req.params.filename);
  if (queuedFiles.has(videoPath)) {
    // File is already in the queue, do not add it again
    console.log("ALREADY IN THERE")
    console.log(requestQueue[0].videoPath)
    // return res.status(409).send('File is already in the queue');
  }
  requestQueue.push({ req, res, videoPath });
  queuedFiles.add(videoPath);

  if (!isProcessing) {
    processNextRequest();
  }

  // const stat = fs.statSync(videoPath);
  // const fileSize = stat.size;
  // const range = req.headers.range;

  // if (range) {
  //   const parts = range.replace(/bytes=/, "").split("-");
  //   const start = parseInt(parts[0], 10);
  //   const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

  //   const chunksize = (end - start) + 1;
  //   const file = fs.createReadStream(videoPath, { start, end });
  //   const head = {
  //     'Content-Range': `bytes ${start}-${end}/${fileSize}`,
  //     'Accept-Ranges': 'bytes',
  //     'Content-Length': chunksize,
  //     'Content-Type': 'video/mp4',
  //   };

  //   res.writeHead(206, head);
  //   file.pipe(res);
  // } else {
  //   const head = {
  //     'Content-Length': fileSize,
  //     'Content-Type': 'video/mp4',
  //   };
  //   res.writeHead(200, head);
  //   fs.createReadStream(videoPath).pipe(res);
  // }
});

function processNextRequest() {
  console.log("CALLED")
  // If there are no requests in the queue, return
  if (requestQueue.length === 0) {
    isProcessing = false;
    return;
  }

  console.log("CALLED")

  // Set the flag to indicate that a request is being processed
  isProcessing = true;

  // Get the next request from the queue
  const nextRequest = requestQueue.shift()
  if (nextRequest) {

  
  const { req, res, videoPath } = nextRequest;

  // Process the request
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;
  
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
  
  // When the response is finished, process the next request
  res.on('finish', () => {
    processNextRequest();
  });
}
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // console.log(req.headers)
    const videoName = req.headers.videoname;
    cb(null, `${videoName}`);
  },
});

const uploadStorage = multer({ storage: storage });

app.post("/upload/single", uploadStorage.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  // console.log(req.file);
  return res.send("Single file");
});

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});