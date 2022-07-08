import React, { useState, useEffect } from "react";
import CustomInput from "../../atoms/CustomInput/CustomInput";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Sample from "../../../assets/sample.jpeg";
import CustomMultiselect from "../../atoms/CustomMultiselect/CustomMultiselect";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import axios from "../../../utils/axios";
import { errorToast, successToast } from "../../../utils/toast";

const useStyles = makeStyles({
  profileImage: {
    width: "10.5rem",
    height: "10rem",
  },
  input: {},
});

function Profile() {
  const classes = useStyles();
  const userId = localStorage.getItem("userId");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [colleges, setColleges] = useState([]);
  const [collegeNames, setCollegeNames] = useState([]);

  const testColleges = ["college-1", "college-2"];

  useEffect(() => {
    async function getUserData() {
      await axios
        .get(`/get-user/${userId}`)
        .then((response) => {
          // console.log(response.data.user);
          const userData = response.data.user;
          const collegeData = response.data.colleges;

          setName(userData.name);
          setPhone(userData.phone);
          setEmail(userData.email);
          setBio(userData.about);
          setCollegeName(userData.college.college);
          setCollegeId(userData.college.id);

          setColleges(collegeData);

          let clgNames = [];

          collegeData.map((college) => clgNames.push(college.college));
          setCollegeNames(clgNames);
        })
        .catch((err) => {
          errorToast(err.message, 5000);
        });
    }

    getUserData();
  }, []);

  const handleSaveChanges = async () => {
    await axios
      .put("/update-user", {
        userId,
        name,
        email,
        about: bio,
        phone,
        collegeId,
        image,
      })
      .then((response) => {
        successToast(response.data.msg, 3000);
      })
      .catch((err) => {
        errorToast(err.message, 5000);
      });
  };

  return (
    <div className="border-2 border-offWhite relative">
      <div className="p-4 border-b-2 border-offWhite">
        <p className="text-2xl font-bold text-primary tracking-wide">
          Edit profile
        </p>
      </div>

      <div className="p-4 border-b-2 border-offWhite">
        <div>
          <p className="text-lg font-bold text-primary">Basic information</p>
        </div>
        <div className="flex items-start mt-2">
          <div className="w-40p mr-20">
            <div>
              <CustomInput
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                className="mb-4 border-2 border-coolGray px-2 bg-white py-2 rounded w-100p"
              />
            </div>
            <div>
              <textarea
                placeholder="About me (optional)"
                rows={3}
                className="mb-4 border-2 border-coolGray px-2 bg-white py-2 rounded w-100p"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div>
            <Avatar src={Sample} className={classes.profileImage} />
          </div>
        </div>
      </div>

      <div className="p-4">
        <div>
          <p className="text-lg font-bold text-primary">Contact information</p>
        </div>

        <div className="mt-2">
          <div>
            <CustomInput
              type="phone"
              className="mb-4 border-2 border-coolGray px-2 bg-white py-2 rounded w-40p"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <CustomInput
              type="email"
              className="mb-4 border-2 border-coolGray px-2 bg-white py-2 rounded w-40p"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            {collegeNames !== undefined && collegeName !== undefined && (
              <CustomMultiselect
                items={collegeNames}
                value={collegeName}
                onChange={(e) => {
                  setCollegeName(e.target.value);
                  let obj = colleges.find(
                    (clg) => clg.college === e.target.value
                  );

                  setCollegeId(obj.id);
                }}
                className="w-40p"
              />
            )}
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <CustomButton
          text="Save changes"
          className="mt-5 p-3 tracking-wider flex flex-row items-end"
          onClick={handleSaveChanges}
        />
      </div>
    </div>
  );
}

export default Profile;
