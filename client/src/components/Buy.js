import {ethers} from "ethers"

const Buy = ({state})=>
{
    const buy = async(event)=>{
        event.preventDefault();
        const {contract} = state;
        const name = document.querySelector("#name").value;
        const message = document.querySelector("#message").value;
        console.log(name,message,contract);

        const amount = {value:ethers.utils.parseEther("0.001")};
        const transaction = await contract.buy(name,message,amount);
        await transaction.wait();
        console.log("transaction is done");
    };

    return<>
    <form onSubmit = {buy}> 
        <label>Name</label>
        <input type="text" id="name" placeholder = "Enter your name"></input>
        <label>Message</label>
        <input type="text" id="message" placeholder = "Enter your Message"></input>
        <button type="submit">Pay</button>
    </form>
    </>
}
export default Buy;