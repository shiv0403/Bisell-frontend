import React, { useState } from "react";
import CustomButton from "../components/atoms/CustomButton/CustomButton";
import CustomInput from "../components/atoms/CustomInput/CustomInput";
import PhotoUpload from "../components/atoms/PhotoUpload/PhotoUpload";

function PostAd() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  const [photo1, setPhoto1] = useState("");
  const [photo2, setPhoto2] = useState("");
  const [photo3, setPhoto3] = useState("");
  const [photo4, setPhoto4] = useState("");
  const [photo5, setPhoto5] = useState("");
  const [photo6, setPhoto6] = useState("");

  const handleFileChange = () => {};

  return (
    <div>
      {/* title */}
      <div className="text-center mt-7">
        <h1 className="font-bold">POST YOUR AD</h1>
      </div>

      {/* main */}
      <div className="w-60p mx-auto mt-10 border-2 border-offWhite p-4">
        {/* details */}
        <div className="border-b-2 border-offWhite py-4">
          <div>
            <h3 className="font-bold tracking-wide text-xl">
              INCLUDE SOME DETAILS
            </h3>
          </div>

          <div className="mt-2">
            <CustomInput
              label="Ad title *"
              maxLength={70}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-coolGray px-2 py-2 w-50p rounded text-xl"
            />
            <p className="text-gray text-sm">
              Mention the key features of your item (e.g. brand, model, age,
              type)
            </p>
          </div>

          <div className="mt-4">
            <label className="text-coolGray">Description *</label>
            <br />
            <textarea
              maxLength={4096}
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="border-2 border-coolGray px-2 py-2 w-50p rounded text-lg"
            />
            <p className="text-gray text-sm -mt-1">
              Include condition, features and reason for selling
            </p>
          </div>
        </div>

        <div className="border-b-2 border-offWhite py-4">
          <div>
            <h3 className="font-bold tracking-wide text-xl">SET A PRICE</h3>
          </div>
          <div className="mt-2">
            <CustomInput
              label="Price *"
              placeholder="INR"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border-2 border-coolGray px-2 py-2 w-50p rounded text-xl"
            />
          </div>
        </div>

        <div className="border-b-2 border-offWhite py-4">
          <div>
            <h3 className="font-bold tracking-wide text-xl">
              UPLOAD UPTO 6 PHOTOS (Min. 2)
            </h3>
          </div>

          {/* 6 photo uploads */}
          <div className="grid grid-cols-3 gap-4 w-40p mt-5">
            <div>
              <PhotoUpload handleFileChange={handleFileChange} />
            </div>
            <div>
              <PhotoUpload handleFileChange={handleFileChange} />
            </div>
            <div>
              <PhotoUpload handleFileChange={handleFileChange} />
            </div>
            <div>
              <PhotoUpload handleFileChange={handleFileChange} />
            </div>
            <div>
              <PhotoUpload handleFileChange={handleFileChange} />
            </div>
            <div>
              <PhotoUpload handleFileChange={handleFileChange} />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <CustomButton
            text="Post now"
            className="px-4 py-3 text-lg tracking-widest font-bold"
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
}

export default PostAd;
