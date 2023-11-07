import parse from "html-react-parser";

const AboutMe = ({ user }: { user: any }) => {
  // card based contact me section with icons and links to social media and email using user.contacts
  const callToAction = () => {
    return (
      <button id="call-to-action-button" onClick={(event) => (window.location.href = "mailto:" + user.email)}>
        Contact Me
        <span id="radar-animation-1"></span>
      </button>
    );
  };

  return (
    <>
      <div id="aboutme_info">
        <div id="aboutme_text">
          <div id="welcome">
            <div id="welcome_text">
              <span id="big_welcome">Hiya!</span> My name is{" "}
              <span id="colored_name">
                {user.firstName} {user.lastName}
              </span>
              ,
            </div>
          </div>
          {parse(user.about)}
          <div id="call-to-action">{callToAction()}</div>
        </div>
        <div id="aboutme-header">
          <div id="aboutme-header-text">.about</div>
        </div>
      </div>
    </>
  );
};

export default AboutMe;
