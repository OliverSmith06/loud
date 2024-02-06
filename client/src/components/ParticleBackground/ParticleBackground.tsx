// import Particles from "@tsparticles/react";
// import { loadSlim } from "tsparticles-slim"; // loads tsparticles-slim
// //import { loadFull } from "tsparticles"; // loads tsparticles
// import { useCallback, useMemo } from "react";

// // tsParticles Repository: https://github.com/matteobruni/tsparticles
// // tsParticles Website: https://particles.js.org/
// const ParticlesComponent = (props: any) => {
//   // using useMemo is not mandatory, but it's recommended since this value can be memoized if static
//   const options = useMemo(() => {
//     // using an empty options object will load the default options, which are static particles with no background and 3px radius, opacity 100%, white color
//     // all options can be found here: https://particles.js.org/docs/interfaces/Options_Interfaces_IOptions.IOptions.html
//     return {
//       background: {
//         color: "#000", // this sets a background color for the canvas
//       },
//       fullScreen: {
//         enable: true, // enabling this will make the canvas fill the entire screen, it's enabled by default
//         zIndex: -1, // this is the z-index value used when the fullScreen is enabled, it's 0 by default
//       },
//       interactivity: {
//         events: {
//           onClick: {
//             enable: true, // enables the click event
//             mode: "push", // adds the particles on click
//           },
//           onHover: {
//             enable: true, // enables the hover event
//             mode: "repulse", // make the particles run away from the cursor
//           },
//         },
//         modes: {
//           push: {
//             quantity: 10, // number of particles to add on click
//           },
//           repulse: {
//             distance: 100, // distance of the particles from the cursor
//           },
//         },
//       },
//       particles: {
//         links: {
//           enable: true, // enabling this will make particles linked together
//           distance: 200, // maximum distance for linking the particles
//         },
//         move: {
//           enable: true, // enabling this will make particles move in the canvas
//           speed: { min: 1, max: 5 }, // using a range in speed value will make particles move in a random speed between min/max values, each particles have its own value, it won't change in time by default
//         },
//         opacity: {
//           value: { min: 0.3, max: 0.7 }, // using a different opacity, to have some semitransparent effects
//         },
//         size: {
//           value: { min: 1, max: 3 }, // let's randomize the particles size a bit
//         },
//       },
//     };
//   }, []);

//   // useCallback is not mandatory, but it's recommended since this callback can be memoized if static
//   const particlesInit = useCallback((engine) => {
//     loadSlim(engine);
//     // loadFull(engine); // for this sample the slim version is enough, choose whatever you prefer, slim is smaller in size but doesn't have all the plugins and the mouse trail feature
//   }, []);

//   // setting an id can be useful for identifying the right particles component, this is useful for multiple instances or reusable components
//   return <Particles id={props.id} init={particlesInit} options={options} />;
// };

// export default ParticlesComponent;


import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import './ParticleBackground.scss';
// import { loadAll } from "@/tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

const ParticleBackground = () => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#101418",
        },
      },
      fpsLimit: 120,
      interactivity: {
        // events: {
        //   onClick: {
        //     enable: true,
        //     mode: "push",
        //   },
        //   onHover: {
        //     enable: true,
        //     mode: "repulse",
        //   },
        // },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: false,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out",
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 160,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 0.7, max: 1 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        style={{position: 'fixed'}}
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
};

export default ParticleBackground;