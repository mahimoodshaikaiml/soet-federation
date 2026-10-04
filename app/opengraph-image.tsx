import { ImageResponse } from "next/og";
import manifestoData from "@/content/manifesto.json";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  const { candidate } = manifestoData;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F3EAD3",
          padding: "40px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#F3EAD3",
            border: "4px solid #1A1410",
            boxShadow: "10px 10px 0px #1A1410",
            padding: "44px",
          }}
        >
          {/* Top Row: University / School & Manifesto Badge */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#1A1410",
                  opacity: 0.8,
                }}
              >
                {candidate.university}
              </span>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#1A1410",
                  opacity: 0.7,
                }}
              >
                {candidate.school}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#1A1410",
                color: "#F3EAD3",
                border: "3px solid #1A1410",
                boxShadow: "4px 4px 0px #C9A227",
                padding: "8px 20px",
              }}
            >
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#F3EAD3",
                }}
              >
                SOET Federation
              </span>
            </div>
          </div>

          {/* Main Middle Content: Candidate Information */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#C9A227",
                border: "3px solid #1A1410",
                boxShadow: "4px 4px 0px #1A1410",
                padding: "6px 18px",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#1A1410",
                }}
              >
                Candidate for {candidate.position}
              </span>
            </div>

            <div
              style={{
                fontSize: 72,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.03em",
                color: "#1A1410",
                lineHeight: 1.05,
                marginBottom: "8px",
              }}
            >
              {candidate.name}
            </div>

            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#1A1410",
                marginBottom: "8px",
              }}
            >
              {candidate.program}
            </div>

            <div
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "#1A1410",
                opacity: 0.9,
              }}
            >
              {candidate.school}
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              borderTop: "3px solid rgba(26, 20, 16, 0.2)",
              paddingTop: "20px",
            }}
          >
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#1A1410",
              }}
            >
              {candidate.position}
            </span>

            <span
              style={{
                fontSize: 18,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#1A1410",
                opacity: 0.75,
              }}
            >
              {candidate.university}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
