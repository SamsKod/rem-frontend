import React from "react";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { axiosRes } from "../../api/axiosDefaults";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";
// import { MoreDropdown } from "../../components/MoreDropdown";
import ClipboardCopy from "../../utils/CopyTextBlock";
import CodeBlock from "../../utils/CodeBlock"
import styles from "../../styles/Note.module.css";

// import SyntaxHighlighter from 'react-syntax-highlighter';
// import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

 
const Note = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    // pin_id,
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

  console.log(props)

  // const CodeBlock: React.FC<{ codestring: string }> = ({ codestring }) => {
  //   let codeWithMinLines = codestring;
  //   if (codestring) { 
  //   const minLines = 2; // Adjust the minimum number of lines as needed

  //   const codeLines = codestring.split('\n');
  //   const emptyLines = new Array(Math.max(minLines - codeLines.length, 0)).fill('');

  //   codeWithMinLines = codeLines.concat(emptyLines).join('\n');
  //   }
  // return (
  //   <SyntaxHighlighter
  //     // language="javascript"
  //     style={a11yDark}
  //     showLineNumbers>
  //     {codeWithMinLines}
  //      {/*{codestring}*/}
  //   </SyntaxHighlighter>
  // );
  // };

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

  console.log(pin_id)


  return (
    <Card className={styles.Note}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link className={`${styles.ProfileLink} font-weight-bold`} to={`/profiles/${profile_id}`}>
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
        {title && <Card.Title className=" display-4 text-center">{title}</Card.Title>}
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
          { pin_id ? (
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
          {currentUser ? 
          <Link to={`/notes/${id}`}>  
            <i className={`fa-solid fa-comment ${styles.IconOutline}`} />
          </Link>
            :
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to comment notes!</Tooltip>}
            >            
            <i className="fa-solid fa-comment" />
            </OverlayTrigger> 
            }
         
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Note;