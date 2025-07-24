document.getElementById("lessonForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = e.target;
  const get = (name) => form[name].value.trim();

  const lessonTitle = get("lessonTitle");
  const lessonDescription = get("lessonDescription");

  const sessions = [1, 2, 3].map((i) => ({
    title: get(`session${i}Title`),
    brief: get(`session${i}Brief`),
    points: get(`session${i}Points`).split(",").map(p => p.trim()),
    full: get(`session${i}Full`),
    image: get(`session${i}Image`),
    resources: get(`session${i}Resources`)
  }));

  let htmlContent = `
    <html>
    <head><title>${lessonTitle}</title></head>
    <body>
      <h1>${lessonTitle}</h1>
      <p><strong>Description:</strong> ${lessonDescription}</p>
      ${sessions.map((s, idx) => `
        <h2>Session ${idx + 1}: ${s.title}</h2>
        <p><strong>Brief:</strong> ${s.brief}</p>
        <p><strong>Key Points:</strong></p>
        <ul>${s.points.map(p => `<li>${p}</li>`).join("")}</ul>
        <p><strong>Explanation:</strong> ${s.full}</p>
        <p><strong>Image:</strong> <img src="${s.image}" alt="Session layout" /></p>
        <p><strong>Resources:</strong> ${s.resources}</p>
      `).join("")}
    </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${lessonTitle.replace(/\s+/g, "_")}.html`;
  link.click();
});
