import React from "react";
import "./Footer.css";
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";

export default function App() {
  return (
    <MDBFooter className="text-center" color="white" bgColor="dark">
      <MDBContainer className="p-4">
        <section className="mb-4">
          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="facebook-f" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="twitter" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="google" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="instagram" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="linkedin-in" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="github" />
          </MDBBtn>
        </section>

        <section className="">
          <form action="">
            <MDBRow className="d-flex justify-content-center">
              <MDBCol size="auto">
                <p className="pt-2">
                  <strong>Sign up for our newsletter</strong>
                </p>
              </MDBCol>

              <MDBCol md="5" start>
                <MDBInput
                  contrast
                  type="email"
                  label="Email address"
                  className="mb-4"
                />
              </MDBCol>

              <MDBCol size="auto">
                <MDBBtn outline color="light" type="submit" className="mb-4">
                  Subscribe
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </form>
        </section>

        <section className="mb-4">
          <p>
            We’re dedicated to helping you organize your tasks and achieve your
            goals efficiently. Stay productive and keep your life in balance
            with our intuitive task management solution. Thank you for choosing{" "}
            <strong>TODO</strong> as your go-to app for all your task management
            needs!
          </p>
        </section>
      </MDBContainer>

      <div
        className="footer"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          padding: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="copyright" style={{ textAlign: "center" }}>
          © 2024 Copyright&nbsp;
          <span className="text-white">TODO</span>
        </div>
        <div className="made-with">
          <span href="#" rel="noopener noreferrer" className="text-white">
            Made with{" "}
            <span aria-label="Love" style={{ color: "#f43f5e" }}>
              &hearts;
            </span>{" "}by{" "}
            <a href="https://github.com/iOmKumar30" className = "github">
              <b>theKitty</b>
            </a>
          </span>
        </div>
      </div>
    </MDBFooter>
  );
}
