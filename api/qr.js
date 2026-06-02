const BANK_ID = "ACB";
const ACCOUNT_NO = "33689707";
const ACCOUNT_NAME = "NGUYEN NGOC TRI VINH";

function cleanAmount(value) {
  return String(value || "0").replace(/\D/g, "").slice(0, 9) || "0";
}

function cleanInfo(value) {
  return String(value || "Donate Vinhx")
    .replace(/[^\w\sÀ-ỹ._-]/g, "")
    .trim()
    .slice(0, 80) || "Donate Vinhx";
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).send("Method Not Allowed");
  }

  const amount = cleanAmount(req.query.amount);
  const info = cleanInfo(req.query.info);
  const download = req.query.download === "1";

  const url = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-compact2.png?amount=${amount}&accountName=${encodeURIComponent(
    ACCOUNT_NAME
  )}&addInfo=${encodeURIComponent(info)}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(502).send("QR fetch failed");
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "no-store");

    if (download) {
      res.setHeader("Content-Disposition", `attachment; filename="vinhprofile-qr-${amount}.png"`);
    }

    return res.status(200).send(buffer);
  } catch {
    return res.status(500).send("QR error");
  }
}
