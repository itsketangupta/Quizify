export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ message: "API working ✅" });
  }

  try {
    const { email } = req.body;

    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NOTION_KEY}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28"
      },
      body: JSON.stringify({
        parent: {
          database_id: process.env.DB_ID
        },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: email
                }
              }
            ]
          },
          Email: {
            email: email
          }
        }
      })
    });

    const data = await response.json();

    res.status(200).json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed" });
  }
}
