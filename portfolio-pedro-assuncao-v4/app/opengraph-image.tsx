import { ImageResponse } from "next/og";

export const alt =
  "Pedro Assunção — Sites para profissionais e pequenos negócios";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "64px 76px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(130deg, #0c0b0d, #291320)",
          color: "#f5f1eb",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 26 }}>Pedro Assunção</span>
          <span style={{ fontSize: 17, color: "#f48aa1" }}>
            Design & desenvolvimento web
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 76,
            fontWeight: 600,
            letterSpacing: "-4px",
            lineHeight: 1.12,
          }}
        >
          <span>Seu próximo cliente</span>
          <span style={{ color: "#f48aa1" }}>precisa encontrar você.</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #664050",
            paddingTop: 24,
            color: "#c9b8c2",
            fontSize: 20,
          }}
        >
          <span>Sites · Landing pages · Redesign</span>
          <span>Vamos conversar sobre seu site ↗</span>
        </div>
      </div>
    ),
    size,
  );
}
