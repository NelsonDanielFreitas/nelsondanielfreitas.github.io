import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import "animate.css";
import TrackVisibility from "react-on-screen";
import axios from "axios";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export const Contact = () => {
  const formInitialDetails = {
    firstName: "",
    lastName: "",
    email: "",
    descricao: "",
    number: "",
  };
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Send");
  const [status, setStatus] = useState({});
  const [sent, setSent] = useState(false);
  const [text, setText] = useState("");

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");
    // let response = await fetch("http://localhost:4545/api/touch", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json;charset=utf-8",
    //   },
    //   body: JSON.stringify(formDetails),
    // });
    // setButtonText("Send");
    // let result = await response.json();

    let response = await fetch("http://localhost:4545/api/touch/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formDetails, to: "jedidaniel34@gmail.com" }),
    });

    setButtonText("Send");
    setFormDetails(formInitialDetails);
  };

  // const handleSend = async (e) => {
  //   setSent(true);
  //   try {
  //     await axios.post("http://localhost:4545/api/send_mail", {
  //       text,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_m4wyf5y",
        "template_xdft00j",
        form.current,
        "Qj9vxvnL3xLz3CcZu"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <img
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                  src={contactImg}
                  alt="Contact Us"
                />
              )}
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2>Get In Touch</h2>
                  {/* <form onSubmit={handleSubmit} > */}
                  <form ref={form} onSubmit={sendEmail}>
                    <Row>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="text"
                          // value={formDetails.firstName}
                          placeholder="First Name"
                          name="user_name"
                          // onChange={(e) =>
                          //   onFormUpdate("firstName", e.target.value)
                          // }
                        />
                      </Col>
                      {/* <Col size={12} sm={6} className="px-1">
                        <input
                          type="text"
                           value={formDetails.lastName}
                          placeholder="Last Name"
                          onChange={(e) =>
                            onFormUpdate("lastName", e.target.value)
                          }
                        />
                      </Col> */}
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="email"
                          // value={formDetails.email}
                          placeholder="Email Address"
                          name="user_email"
                          // onChange={(e) =>
                          //   onFormUpdate("email", e.target.value)
                          // }
                        />
                      </Col>
                      {/* <Col size={12} sm={6} className="px-1">
                        <input
                          type="tel"
                          value={formDetails.number}
                          placeholder="Phone No."
                          onChange={(e) =>
                            onFormUpdate("number", e.target.value)
                          }
                        />
                      </Col> */}
                      <Col size={12} className="px-1">
                        <textarea
                          rows="6"
                          // value={formDetails.descricao}
                          placeholder="Message"
                          name="message"
                          // onChange={(e) =>
                          //   onFormUpdate("descricao", e.target.value)
                          // }
                        ></textarea>
                        <button type="submit" value="Send">
                          SEND
                        </button>
                      </Col>
                      {status.message && (
                        <Col>
                          <p
                            className={
                              status.success === false ? "danger" : "success"
                            }
                          >
                            {status.message}
                          </p>
                        </Col>
                      )}
                    </Row>
                  </form>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
