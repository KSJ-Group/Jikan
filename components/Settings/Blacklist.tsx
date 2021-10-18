import React, { useEffect, useState } from "react";
import styles from "../../styles/Settings/Settings.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Blacklist: React.FC = () => {
  const [showModal, setShow] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [temp, setTemp] = useState<string[]>(["www.facebook.com", "www.youtube.com", "www.reddit.com"]);

  const handleOpen = (): void => {
    setShow(true);
  };

  const handleClose = (): void => {
    setShow(false);
  };


  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const submitHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if (!input.match(regex)) {
      window.alert('Enter a valid website');
    } else {
      if (!temp.includes(input)) {
        if (!input.startsWith('www.')) {
          setTemp(prev => [...prev, 'www.' + input]);
        } else {
          setTemp(prev => [...prev, input]);
        }
      } else {
        window.alert('Website already blocked.');
      }
    }

    const form = document.getElementById("form") as HTMLFormElement;
    form!.reset();
  };


  const removeFromList = (url: string): void => {
    // let updated = temp;
    // updated.splice(updated.indexOf(url), 1);
    setTemp(prev => {
      return (
        temp.filter(item => url !== item)
      )
    });
  }

  useEffect(() => {
    console.log(temp)
  }, [temp])

  return (
    <div className={styles.blacklistContainer}>
      <div>Blocked Websites</div>
      <button onClick={handleOpen} className={styles.blockBtn}>
        View or Edit
      </button>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Blocked Websites</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.blModal}>
          <div>Add websites below to block them when your Pomodoro Timer is running. Follow the format: www.example.com</div>

          <div className={styles.blList}>
            {temp.map((url) => {
              return (
                <div className={styles.eachURL}>
                  <div key={url}>{url}</div>
                  <div className={styles.removeLink} onClick={() => removeFromList(url)}>x</div>
                </div>
              )
            })}
          </div>
          <form onSubmit={(e: any) => submitHandler(e)} id="form">
            <input
              className={styles.blInput}
              id="urlInput"
              type="text"
              placeholder="www.example.com"
              defaultValue="www."
              autoComplete="off"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                changeHandler(e)
              }
            />
            <input
              onClick={(e: any) => submitHandler(e)}
              type="button"
              value="Add"
              className={styles.addBtn}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button className={styles.modalBtn} variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Blacklist;
