import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

// import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import Note from "../notes/Note";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/empty.png";
import { ProfileEditDropdown } from "../../components/MoreDropdown";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profileNotes, setProfileNotes] = useState({ results: [] });

  // const currentUser = useCurrentUser();
  const { id } = useParams();

  const { setProfileData } = useSetProfileData();
  const { pageProfile } = useProfileData();

  const [profile] = pageProfile.results;
  // const is_owner = currentUser?.username === profile?.owner;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profileNotes }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/notes/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfileNotes(profileNotes);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={12}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
              <div>Notes: {profile?.notes_count}</div>
              
            </Col>
          </Row>
        </Col>
        {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );

  const mainProfileNotes = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s notes</p>
      <hr />
      {profileNotes.results.length ? (
        <InfiniteScroll
          children={profileNotes.results.map((notes) => (
            <Note key={notes.id} {...notes} setNotes={setProfileNotes} />
          ))}
          dataLength={profileNotes.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileNotes.next}
          next={() => fetchMoreData(profileNotes, setProfileNotes)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't made any notes yet.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col className="ml-auto" lg={12}>
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfileNotes}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
    </Row>
  );
}

export default ProfilePage;