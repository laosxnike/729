const { json, loadContent } = require("./_shared");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") return json(res, 405, { error: "Method not allowed" });

  try {
    const content = await loadContent();
    json(res, 200, content);
  } catch (error) {
    json(res, 500, { error: error.message || "Content source failed" });
  }
};
