// import Button from "@material-ui/core/Button"
// import IconButton from "@material-ui/core/IconButton"
// import TextField from "@material-ui/core/TextField"
// import AssignmentIcon from "@material-ui/icons/Assignment"
// import PhoneIcon from "@material-ui/icons/Phone"
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PhoneIcon from "@mui/icons-material/Phone";
import React, { useEffect, useRef, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Peer, { Instance, SignalData } from "simple-peer"
import { io } from "socket.io-client"
import "./App.css"

// import React, { useEffect, useRef, useState } from "react";
// import Button from "@mui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
// import TextField from "@material-ui/core/TextField";
// import AssignmentIcon from "@material-ui/icons/Assignment";
// import PhoneIcon from "@material-ui/icons/Phone";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import Peer from "simple-peer";
// import io from "socket.io-client";
// import "./App.css";

const socket = io("http://localhost:5050");

const call: React.FC = () => {
  const [me, setMe] = useState<string>("");
  const [stream, setStream] = useState<MediaStream | undefined>();
  const [receivingCall, setReceivingCall] = useState<boolean>(false);
  const [caller, setCaller] = useState<string>("");
  const [callerSignal, setCallerSignal] = useState<Peer.SignalData | string>('');
  const [callAccepted, setCallAccepted] = useState<boolean>(false);
  const [idToCall, setIdToCall] = useState<string>("");
  const [callEnded, setCallEnded] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<Peer.Instance | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      if (myVideo.current) {
        myVideo.current.srcObject = stream;
      }
    });

    socket.on("me", (id: string) => {
      setMe(id);
    });

    socket.on("callUser", (data: { from: string; name: string; signal: Peer.SignalData }) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id: string) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });
    socket.on("callAccepted", (signal: any) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", color: "#fff" }}>Zoomish</h1>
      <div className="container">
        <div className="video-container">
          <div className="video">{stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}</div>
          <div className="video">{callAccepted && !callEnded ? <video playsInline ref={userVideo} autoPlay style={{ width: "300px" }} /> : null}</div>
        </div>
        <div className="myId">
          <TextField id="filled-basic" label="Name" variant="filled" value={name} onChange={(e: any) => setName(e.target.value)} style={{ marginBottom: "20px" }} />
          <CopyToClipboard text={me}>
            <Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
              Copy ID
            </Button>
          </CopyToClipboard>

          <TextField id="filled-basic" label="ID to call" variant="filled" value={idToCall} onChange={(e: any) => setIdToCall(e.target.value)} />
          <div className="call-button">
            {callAccepted && !callEnded ? (
              <Button variant="contained" color="secondary" onClick={leaveCall}>
                End Call
              </Button>
            ) : (
              <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
                <PhoneIcon fontSize="large" />
              </IconButton>
            )}
            {idToCall}
          </div>
        </div>
        <div>{receivingCall && !callAccepted ? <div className="caller"><h1>{name} is calling...</h1><Button variant="contained" color="primary" onClick={answerCall}>Answer</Button></div> : null}</div>
      </div>
    </>
  );
};

export default call;