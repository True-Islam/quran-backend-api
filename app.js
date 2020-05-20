const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();

app.set("case sensitive routing", true);
app.use(bodyParser.json());

app.use(morgan("dev"));

const { audioRoutes } = require("./api/routes/audio");
const { editionRoutes } = require("./api/routes/edition");
const { imageRoutes } = require("./api/routes/image");
const { surahRoutes } = require("./api/routes/surah");
const { translationRoutes } = require("./api/routes/translation");
const ayahRoutes = require("./api/routes/ayah");

app.use("/v1/audio", audioRoutes);
app.use("/v1/edition", editionRoutes);
app.use("/v1/image", imageRoutes);
app.use("/v1/surah", surahRoutes);
app.use("/v1/translation", translationRoutes);
app.use("/v1/ayah", ayahRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    code: error.status || 500,
    error: {
      message: error.message,
    },
  });
});

if (module === require.main) {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log("Press Ctrl+C to quit.");
  });
}

module.exports = app;
