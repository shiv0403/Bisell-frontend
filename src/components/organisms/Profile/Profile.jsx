import React, { useState } from "react";
import CustomInput from "../../atoms/CustomInput/CustomInput";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import Sample from "../../../assets/sample.jpeg";
import CustomMultiselect from "../../atoms/CustomMultiselect/CustomMultiselect";
import CustomButton from "../../atoms/CustomButton/CustomButton";

const useStyles = makeStyles({
  profileImage: {
    width: "10.5rem",
    height: "10rem",
  },
  input: {},
});

function Profile() {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [college, setCollege] = useState("");

  const colleges = [
    "Jaypee institute of information technology, noida",
    "Indian institute of technology, Bombay",
    "All india institute of medical sciences",
    "Manipal institute of technology, manglore",
    "Jawaharlal national institute of tenchnology, delhi",
  ];

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
            <CustomMultiselect
              items={colleges}
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-40p"
            />
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <CustomButton
          text="Save changes"
          className="mt-5 p-3 tracking-wider flex flex-row items-end"
        />
      </div>
    </div>
  );
}

export default Profile;
