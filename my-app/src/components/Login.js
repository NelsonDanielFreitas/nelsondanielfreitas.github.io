import { useState, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import "animate.css";
import TrackVisibility from "react-on-screen";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { user, setCurrentUser } = useContext(AuthContext);
  const [formDetails, setFormDetails] = useState();
  const [buttonText, setButtonText] = useState("Send");
  const [status, setStatus] = useState({});
  const [username, setUsername] = useState("nelsonfreitas");
  const [password, setPassword] = useState("123456");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.trim().length < 4 || password.trim().length < 4) {
      return;
    }

    const payload = { username, password };

    const { data } = await axios.post(
      "http://localhost:4545/api/user/login",
      payload
    );
    if (data.token) {
      setCurrentUser(data.token);

      navigate("/");
    }
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
                  <h2>Admin Login</h2>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="text"
                          value={username}
                          placeholder="Username"
                          name="username"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <button type="submit">
                          <span>{buttonText}</span>
                        </button>
                      </Col>

                      <Col size={20} sm={6} className="px-1">
                        <input
                          type="password"
                          value={password}
                          placeholder="Password"
                          name="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Col>
                      <span>
                        <Link to="/">Go to the menu</Link>
                      </span>
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
