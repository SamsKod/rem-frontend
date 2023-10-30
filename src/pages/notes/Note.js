import React from "react";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { axiosRes } from "../../api/axiosDefaults";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import ClipboardCopy from "../../utils/CopyTextBlock";
import CodeBlock from "../../utils/CodeBlock";
import styles from "../../styles/Note.module.css";

const Note = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    pin_id,
    title,
    content,
    code,
    updated_at,
    notePage,
    setNotes,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/notes/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/notes/${id}/`);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handlePin = async () => {
    try {
      const { data } = await axiosRes.post("/pins/", { note: id });
      setNotes((prevNotes) => ({
        ...prevNotes,
        results: prevNotes.results.map((note) => {
          return note.id === id
            ? { ...note, pins_count: note.pins_count + 1, pin_id: data.id }
            : note;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnpin = async () => {
    try {
      await axiosRes.delete(`/pins/${pin_id}/`);
      setNotes((prevNotes) => ({
        ...prevNotes,
        results: prevNotes.results.map((note) => {
          return note.id === id
            ? { ...note, pins_count: note.pins_count - 1, pin_id: null }
            : note;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Note}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link
            className={`${styles.ProfileLink} font-weight-bold`}
            to={`/profiles/${profile_id}`}
          >
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="font-weight-bold d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && notePage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link className={styles.Titlelink} to={`/notes/${id}`}>
        {title && (
          <Card.Title className=" display-4 text-center">{title}</Card.Title>
        )}
      </Link>
      <Card.Body>
        <h4 className="text-left">Description:</h4>
        {content && <Card.Text className="text-left">{content}</Card.Text>}
        <h4>Code</h4>

        <div className={`w-1/2 ${styles.CodeBlock}`}>
          <ClipboardCopy copyText={code} />
          <CodeBlock codestring={code} />
        </div>

        <div>
          {pin_id ? (
            <span onClick={handleUnpin}>
              <i className={`fa-solid fa-thumbtack ${styles.Pin}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handlePin}>
              <i className={`fa-solid fa-thumbtack ${styles.IconOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to pin notes!</Tooltip>}
            >
              <i className="fa-solid fa-thumbtack" />
            </OverlayTrigger>
          )}
          {currentUser ? (
            <Link to={`/notes/${id}`}>
              <i className={`fa-solid fa-comment ${styles.IconOutline}`} />
            </Link>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to comment notes!</Tooltip>}
            >
              <i className="fa-solid fa-comment" />
            </OverlayTrigger>
          )}

          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Note;
