export default function handler(req, res) {
  if (req.query["target"]) {
    fetch(
      `https://demo.phone-number-api.com/json/?number=${req.query["target"]}`
    )
      .then((info) => info.json())
      .then((info) => {
        info["status"] === "success"
          ? res.status(200).json({ Success: true, info })
          : res.status(400).json({ Success: false, message: "Invalid Number" });
      });
  } else {
    res
      .status(400)
      .json({ Success: false, message: "`target` query is neeeded." });
  }
}
