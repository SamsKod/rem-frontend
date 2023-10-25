import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";


function NoteEditForm() {
  const [errors, setErrors] = useState({});

  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
    code: "",
  });
  const { title, content, code} = noteData;

  // const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/notes/${id}/`);
        const { title, content, code, is_owner } = data;

        is_owner
          ? setNoteData({ title, content, code })
          : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setNoteData({
      ...noteData,
      [event.target.name]: event.target.value,
    });
  };

  // const handleChangeImage = (event) => {
  //   if (event.target.files.length) {
  //     URL.revokeObjectURL(image);
  //     setPostData({
  //       ...postData,
  //       image: URL.createObjectURL(event.target.files[0]),
  //     });
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("code", code);

    // if (imageInput?.current?.files[0]) {
    //   formData.append("image", imageInput.current.files[0]);
    // }

    try {
      await axiosReq.put(`/notes/${id}/`, formData);
      history.push(`/notes/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {/*{errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}*/}

      <Form.Group>
        <Form.Label>Code</Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
          name="code"
          value={code}
          onChange={handleChange}
        />
      </Form.Group>
      {/*{errors?.code?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}*/}

      <button className={`${btnStyles.Button} ${btnStyles.Green}`} type="submit">
        save
      </button>
      <button
        className={`${btnStyles.Button} ${btnStyles.Green}`}
        onClick={() => history.goBack()}
      >
        cancel
      </button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        {/*<Col className="m-auto" lg={12}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>*/}
        <Col lg={12} className="m-auto">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default NoteEditForm;