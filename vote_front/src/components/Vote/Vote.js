import React, { useEffect, useState } from "react";
import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { removeToken } from "../../helpers/token";
import Chart from "../Chart/Chart"

const Vote = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [vote, setVote] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const [voteIsOpen, setVoteIsOpen] = useState(false);
  const [results, setResults] = useState([])
  const handleLogout = () => {
    removeToken();
    navigate("/signin", { replace: true });
  };
  useEffect(() => {
    if (user) {
      fetch("http://localhost:1337/api/is-open", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": user.token,
        },
      })
        .then(response => response.json())
        .then(data => {
          setVoteIsOpen(data.data.attributes.isOpen)
        }).catch(error => {
          console.error("Error checking vote:", error);
          setIsLoading(false)
        });
      fetch("http://localhost:1337/api/votes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": user.token,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.message === 'Głos został już oddany') {
            setVote(data.data.glos)
          }
          setIsLoading(false)
        })
        .catch(error => {
          console.error("Error checking vote:", error);
          setIsLoading(false)
        });
    }
  }, [user]);

  useEffect(() => {
    if (user&&!voteIsOpen) {
      fetch("http://localhost:1337/api/votes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": user.token,
        },
      })
        .then(response => response.json())
        .then(data => {
          setResults(data.allVotes)
          console.log(data)
        })
    }
  }, [voteIsOpen,user])

  const handleVote = (voteOption) => {
    setVote(voteOption);
    const data = {
      glos: voteOption,
    };

    fetch("http://localhost:1337/api/votes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": user.token
      },
      body: JSON.stringify({ data })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Vote submitted:", data);
      })
      .catch(error => {
        console.error("Error submitting vote:", error);
      });
  };
  if (user?.id || !isLoading) {
    if (voteIsOpen) {
      return (
        <div style={{ padding: "16px", textAlign: "center" }}>
          <h1>Witaj, {user.username}</h1>
          {!vote && (
            <div style={{ marginBottom: "16px" }}>

              <h2>Głosowanie:</h2>
              <Space direction="vertical" size="middle">
                <Button size="large" style={{ width: "100%" }} type="default" onClick={() => { handleVote("TAK"); }}>TAK</Button>
                <Button size="large" style={{ width: "100%" }} type="default" onClick={() => { handleVote("NIE"); }}>NIE</Button>
                <Button size="large" style={{ width: "100%" }} type="default" onClick={() => { handleVote("WSTRZYMUJE"); }}>WSTRZYMUJĘ</Button>
              </Space>
            </div>
          )}

          {vote && (
            <div>
              <p>Twój głos: {vote}</p>
              <p>Dziękujemy za oddanie głosu!. Wyniki głosowania będą dostępne po zakończeniu głosowania.</p>
            </div>
          )}
          <hr style={{ margin: "32px" }} />
          <Button size="large" danger onClick={handleLogout}>Wyloguj się</Button>
        </div>
      );
    } else {
      return (
        <div style={{ padding: "16px", textAlign: "center" }}>
          <h1>Witaj, {user.username}</h1>
          <div>
            Wybory dobiegły końca!
          </div>
          <Chart data={results} />
        </div>
      )
    }

  } else {
    return <>Ładowanie...</>
  }
};

export default Vote;
