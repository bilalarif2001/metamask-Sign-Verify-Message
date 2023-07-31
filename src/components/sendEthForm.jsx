import React from "react";
import { useState } from "react";
import SpinnerSvg from "../assets/spinnerSvg"; // Processing SVG
import { ethers } from "ethers";

function SendEthForm({ accountId }) {
  const [isSignMessage, setIsSignMessage] = useState(true);
  const [error, setError] = useState(false); // for displaying error message
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [isProcessing, setIsProcessing] = useState(false); // processing state
  const [signedMsgData, setSignedMsgData] = useState();
  const [isVerified, setisVerified] = useState(false);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  // Function to perform eth transaction
  async function signMessage(e) {
    e.preventDefault();
    try {
      setIsProcessing(true);
      let signMessagehash = await signer.signMessage(message);
      setSignedMsgData({
        address:accountId,
        message: message,
        signature: signMessagehash,
      });
      setMessage("");
      setIsProcessing(false);
    } catch (error) {
      setError(error.reason);
    }
  }
  async function verifySignature(e) {
    e.preventDefault()

    try {
      let input = JSON.parse(signature);
      let verifySignature = ethers.utils.verifyMessage(
        input.message,
        input.signature
      );

      if (verifySignature.toLowerCase() === input.address.toLowerCase()) {
        setisVerified(`Message Verified! ${accountId} signed message ${input.message}`);
        setIsProcessing(false);
        setError(false);
      } else {
        setError("Message or signature is not signed against given address");
        setisVerified(false);
      }
    } catch (error) {
      console.log(error);
      if ((error.code = "INVALID_ARGUMENT")) {
        setisVerified(false);
        setError("Invalid Signature");
      }
    }
  }
  // console.log(transactionDetails)
  return (
    <div className=" w-full max-w-2xl">
      <p className=" text-center rounded-lg max-w-lg bg-violet-50 text-violet-500 font-semibold text-sm p-2 border border-violet-200 my-2 mx-auto">
        {accountId}
      </p>
      <div className="flex justify-end space-x-2 max-w-lg mx-auto py-4">
        <button
          className="bg-lime-500 rounded-lg text-white p-2 text-sm font-semibold hover:bg-lime-400 transition duration-200 "
          onClick={() => {
            setError(false);
            setMessage("")
            setIsSignMessage(true);
          }}
        >
          Sign Message
        </button>
        <button
          className="bg-orange-500 rounded-lg text-white p-2 text-sm font-semibold hover:bg-orange-400 transition duration-200"
          onClick={() => {
            setisVerified(false)
            setMessage("")
            setError(false);
            setIsSignMessage(false);
          }}
        >
          Verify Message
        </button>
      </div>
      {isSignMessage ? (
        <form
          onSubmit={signMessage}
          className=" border border-zinc-300 rounded-lg p-6 w-full max-w-lg mx-auto shadow-md"
        >
          <label
            className="text-zinc-400 text-sm font-semibold"
            htmlFor="recAddress"
          >
            Message
          </label>
          <textarea
            id="recAddress"
            rows={8}
            className="p-2 w-full my-2 border-2 focus-within:border-lime-500 text-xs focus:outline-none rounded-lg placeholder:text-xs"
            placeholder="Enter Message"
            defaultValue={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            required
          />
          <p
            className={`text-rose-600 text-xs inline font-medium ${
              error ? "block" : "hidden"
            }`}
          >
            {error}
          </p>
          <button
            onSubmit={signMessage}
            className="w-full mt-4 rounded-md bg-lime-500 p-2 text-white font-semibold hover:bg-lime-400 duration-200"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <p>Processing</p>
                <SpinnerSvg />
              </div>
            ) : (
              "Sign Message"
            )}
          </button>
          {signedMsgData && (
            <div className="w-full max-w-lg border mt-2 border-zinc-300 rounded-lg p-2">
              <p className="text-xs font-semibold py-2">
                Copy below data and paste it in verify Message.
              </p>
              <p className="text-xs text-zinc-500 break-all">
                {JSON.stringify(signedMsgData)}
              </p>
            </div>
          )}
        </form>
      ) : (
        <form
          onSubmit={verifySignature}
          className=" border border-zinc-300 rounded-lg p-6 w-full max-w-lg mx-auto shadow-md"
        >
          <label
            className="text-zinc-400 text-sm font-semibold"
            htmlFor="recAddress"
          >
            Signature
          </label>
          <textarea
            id="recAddress"
            rows={8}
            className="p-2 w-full my-2 border-2 focus-within:border-orange-500 text-xs focus:outline-none rounded-lg placeholder:text-xs"
            onChange={(e) => {
              setSignature(e.target.value);
            }}
            required
            placeholder={`{"address":"0x3a44c28d48f18af424ad7623f37f6ae0013314d8","message":"Hello sir","signature":"0x533333b7de94b089a76d9b1485a771a1793e5ff7613bd50236d7a28fab95ac366deb0926d96645b81cfaecad1bf74b5d7940150a44ef696f693d77f3c075cf211b"}`}
            
            
          />
          <p
            className={`text-rose-600 text-xs inline font-medium ${
              error ? "block" : "hidden"
            }`}
          >
            {error}
          </p>
          <button
            onSubmit={verifySignature}
            className="w-full mt-4 rounded-md bg-orange-500 p-2 text-white font-semibold hover:bg-orange-400 duration-200"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <p>Processing</p>
                <SpinnerSvg />
              </div>
            ) : (
              "Verify Signature"
            )}
          </button>
          {isVerified && (
            <p className="w-full bg-cyan-600 border border-cyan-700 rounded-lg text-white text-sm font-semibold p-2 mt-2 animate-pulse">
              {isVerified}
            </p>
          )}
        </form>
      )}
    </div>
  );
}

export default SendEthForm;
