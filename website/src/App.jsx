import { useEffect, useRef, useState } from "react";
import RacingBars from "racing-bars/react";
import GitHubButton from "react-github-btn";
import "./App.css";

const toExclude = [
  "freecodecamp/freecodecamp",
  "ebookfoundation/free-programming-books",
  "sindresorhus/awesome",
  "996icu/996.icu",
  "public-apis/public-apis",
  "codecrafters-io/build-your-own-x",
  "vinta/awesome-python",
  "awesome-selfhosted/awesome-selfhosted",
  "getify/you-dont-know-js",
  "thealgorithms/python",
  "cyc2018/cs-notes",
  "trekhleb/javascript-algorithms",
  "practical-tutorials/project-based-learning",
  "jwasham/coding-interview-university",
  "kamranahmedse/developer-roadmap",
  "donnemartin/system-design-primer",
  "github/gitignore",
  "ossu/computer-science",
  "jackfrued/Python-100-Days",
  "jlevy/the-art-of-command-line",
  "trimstray/the-book-of-secret-knowledge",
  "snailclimb/javaguide",
  "airbnb/javascript"
];

function App() {
  const raceContainerRef = useRef(null); // Reference to the race container

  // Determine initial options based on screen size
  const initialOptions = {
    dataUrl: "./output.csv",
    autorun: true,
    labelsPosition: window.innerWidth <= 768 ? "inside" : "outside",
    tickDuration: 200,
    theme: "dark",
    highlightBars: true,
    topN: window.innerWidth <= 768 ? 10 : 30,
    labelsWidth: 400,
    selectBars: true,
    title: "Top Starred Repositories on GitHub",
    subTitle: "Contact me to add more repos",
    height: "window",
    endDate: "2024-12-31",
    marginTop: 20,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    dataTransform: (data) =>
      data.filter((d) => !toExclude.includes(d.name)),
  };

  const [options, setOptions] = useState(initialOptions);

  useEffect(() => {
    const updateOptionsForScreenSize = () => {
      if (window.innerWidth <= 768) {
        // Adjust options for mobile or low-resolution screens
        setOptions((prevOptions) => ({
          ...prevOptions,
          labelsPosition: "inside",
          topN: 10,
        }));
      } else {
        // Restore options for larger screens
        setOptions((prevOptions) => ({
          ...prevOptions,
          labelsPosition: "outside",
          topN: 30,
        }));
      }
    };

    // Add event listener to handle screen resize
    window.addEventListener("resize", updateOptionsForScreenSize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateOptionsForScreenSize);
    };
  }, []);

  useEffect(() => {
    const container = raceContainerRef.current;

    if (container) {
      // Attach click handlers after render
      const handleClick = (event) => {
        if (event.target.tagName === "text" && event.target.classList.contains("label")) {
          const repoName = event.target.textContent.trim(); // Ensure no leading/trailing spaces
          const url = `https://github.com/${repoName}`;
          window.open(url, "_blank"); // Open the URL in a new tab
        }
      };

      container.addEventListener("click", handleClick);

      // Cleanup function to remove the event listener
      return () => {
        container.removeEventListener("click", handleClick);
      };
    }
  }, []);

  return (
    <div className="AppContainer">
      {/* GitHub Button positioned at the top-right */}
      <div className="GitHubButtonContainer">
        <GitHubButton
          href="https://github.com/emanuelef/gh-stars-bars"
          data-color-scheme="no-preference: dark; light: dark_dimmed; dark: dark_high_contrast;"
          data-size="small"
          aria-label="Star emanuelef/gh-stars-bars on GitHub"
        >
          GitHub Repo
        </GitHubButton>
      </div>
      {/* Use ref to attach to the container */}
      <div ref={raceContainerRef} id="race" className="OtherContainer">
        <RacingBars {...options}>Loading...</RacingBars>
      </div>
    </div>
  );
}

export default App;
