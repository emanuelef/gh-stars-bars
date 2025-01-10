import { useEffect, useRef } from "react";
import RacingBars from "racing-bars/react";
import GitHubButton from "react-github-btn";
import "./App.css";

function App() {
  const raceContainerRef = useRef(null); // Reference to the race container

  const options = {
    dataUrl: "./output.csv",
    autorun: true,
    labelsPosition: "outside",
    tickDuration: 200,
    theme: "dark",
    highlightBars: true,
    topN: 30,
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
  };

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
