import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [apiData, setAPIData] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleButtonClick = () => {
    fetch(`/api/number-info?target=${phoneNumber}`)
      .then((r) => r.json())
      .then((r) => {
        if (r["message"]) return alert("Invalid Number");
        setAPIData(r["info"]);
        setIsExpanded(true);
        document.getElementById("CTP").style.color = "#fff";
      });
  };

  useEffect(() => {
    fetch("/cdn-cgi/trace")
      .then((trace) => trace.text())
      .then((trace) => {
        var flagImg = document.getElementById("flagImg");
        var flagContainer = document.getElementById("flagContainer");
        flagImg.src = `https://flagicons.lipis.dev/flags/4x3/${trace
          .split("loc=")[1]
          .split("\n")[0]
          .toLocaleLowerCase()}.svg`;
        flagContainer.style.width = `${window.innerWidth - 1}px`;
        flagContainer.style.height = `${window.innerHeight - 1}px`;
        flagContainer.style.backgroundSize = "cover";
        flagContainer.style.backgroundRepeat = "no-repeat";
        document.body.style.overflow = "hidden";
      });
  }, []);
  return (
    <>
      <Head>
        <title>Number Phone Infos</title>
        <meta name="description" content="Get info on any phone number !" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <div id="flagContainer" className={styles.flagContainer}>
          <img
            src="https://flagicons.lipis.dev/flags/4x3/XX.svg"
            id="flagImg"
            className={styles.flagImg}
          />
          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <input
                type="text"
                className={styles.fancyInput}
                placeholder="+33612345678"
                value={phoneNumber}
                onChange={handleInputChange}
              />
              <br />
              <button
                className={styles.fancyButton}
                onClick={handleButtonClick}
              >
                Check
              </button>
              <br />
              <br />
              <div
                id="CTP"
                style={{
                  width: isExpanded ? "50%" : "25%",
                  height: isExpanded ? "50%" : "25%",
                  background: "36393f",
                  transition: "all 0.5s ease-in-out",
                  boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {isExpanded ? (
                  <div>
                    <p styles={styles.CTP}>
                      Country: [+{apiData.numberCountryCode}]{" "}
                      {apiData.countryName}
                    </p>
                    <p>Type: {apiData.numberType}</p>
                    <p>Carrier/ISP: {apiData.carrier}</p>
                    <p>Timezone: {apiData.timezone}</p>
                  </div>
                ) : (
                  <p id="CTP" styles={styles.CTP}>
                    Waiting for a valid number..
                  </p>
                )}
              </div>
              <br />
              <Link href={"https://github.com/TheHellTower/Number-Phone-Infos"}>
                GitHub Repository{" "}
              </Link>
              <Link href={"https://www.youtube.com/shorts/0gVSDp-QY3s"}>
                YouTube Short{" "}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
