import { useState, useEffect } from "react";
const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const [showTransactions, setShowTransactions] = useState(false); // Define showTransactions state

  const { contract } = state;

  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.getMemos();
      setMemos(memos);
    };
    contract && memosMessage();
  }, [contract]);

  const handleArrowClick = () => {
    setShowTransactions(!showTransactions); // Toggle showTransactions state
  };

  return (
    <>
        <div style={{ textAlign: "center",fontWeight:"bold", marginTop: "20px" ,marginBottom:"30px"}}>
          <div onClick={handleArrowClick} style={{ cursor: "pointer", display: "inline-block" }}>
            {showTransactions ? "Hide Transactions ▲" : "Show Transactions ▼"}
          </div>
        </div>

      {showTransactions &&  memos.map((memo) => {
        return (
          <div
            className="container-fluid"
            style={{ width: "100%" }}
            key={Math.random()}
          >
            <table
              style={{
                marginBottom: "10px",
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      backgroundColor: "#ffe4e1",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "150px",
                    }}
                  >
                    {memo.name}
                  </td>

                  
                  <td
                    style={{
                      backgroundColor: "#b0c4de",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "80px",
                    }}
                  >
                    {memo.Amount / 1e18}
                  </td>


                  <td
                    style={{
                      backgroundColor: "#ffe4e1",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "200px",
                    }}
                  >
                    {new Date(memo.timestamp * 1000).toLocaleString()}
                  </td>


                  <td
                    style={{
                      backgroundColor: "#b0c4de",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "400px",
                    }}
                  >
                    {memo.message}
                  </td>


                  <td
                    style={{
                      backgroundColor: "#ffe4e1",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "400px",
                    }}
                  >
                    {memo.from}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  );
};
export default Memos;