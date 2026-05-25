const express = require("express");
const { exec } = require("child_process");

const app = express();

app.use(express.json());

app.post("/create-video", async (req, res) => {

  const { videoUrl, audioUrl } = req.body;

  const command = `
  ffmpeg -i "${videoUrl}" -i "${audioUrl}" \
  -map 0:v -map 1:a \
  -shortest \
  -c:v libx264 \
  -c:a aac \
  output.mp4
  `;

  exec(command, (error) => {

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }

    res.json({
      success: true,
      video: "output.mp4"
    });

  });

});

app.listen(process.env.PORT || 10000, () => {
  console.log("Server running");
});
