import React, { useEffect, useState } from "react";
import CustomButton from "../components/atoms/CustomButton/CustomButton";
import CustomInput from "../components/atoms/CustomInput/CustomInput";
import PhotoUpload from "../components/atoms/PhotoUpload/PhotoUpload";
import axios from "../utils/axios";
import { errorToast, successToast } from "../utils/toast";
import { useNavigate } from "react-router-dom";
import CustomMultiselect from "../components/atoms/CustomMultiselect/CustomMultiselect";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "none",
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: "20px",
    width: "25%",
  },
}));

function EditAd() {
  const classes = useStyles();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  const [openCategory, setOpenCategory] = useState(false);

  const [photo1, setPhoto1] = useState("");
  const [photo2, setPhoto2] = useState("");
  const [photo3, setPhoto3] = useState("");
  const [photo4, setPhoto4] = useState("");
  const [photo5, setPhoto5] = useState("");
  const [photo6, setPhoto6] = useState("");

  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);

  const [newCategory, setNewCategory] = useState("");

  const [updateState, setUpdateState] = useState(false);

  // const [flag1, setFlag1] = useState(false);
  // const [flag2, setFlag2] = useState(false);
  // const [flag3, setFlag3] = useState(false);
  // const [flag4, setFlag4] = useState(false);
  // const [flag5, setFlag5] = useState(false);
  // const [flag6, setFlag6] = useState(false);

  const handleOpenCategory = () => {
    setOpenCategory(true);
  };

  const handleCloseCategory = () => {
    setOpenCategory(false);
  };

  const handleFileChange = async (file, index) => {
    try {
      const response = await axios.get("/ad-image");
      const uploadUrl = response.data.uploadUrl;
      await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: file,
      })
        .then((response) => {
          const imgLink = uploadUrl.split("?")[0];

          if (index === 1) {
            setPhoto1(imgLink);
          } else if (index === 2) {
            setPhoto2(imgLink);
          } else if (index === 3) {
            setPhoto3(imgLink);
          } else if (index === 4) {
            setPhoto4(imgLink);
          } else if (index === 5) {
            setPhoto5(imgLink);
          } else if (index === 6) {
            setPhoto6(imgLink);
          }

          setImages((prev) => [...prev, imgLink]);

          successToast("Image uploaded");
        })
        .catch((err) => {
          errorToast(err.message, 5000);
        });
    } catch (error) {
      errorToast("Unable to upload image");
    }
  };

  const handleEditAd = async () => {
    let categoryIdsSelected = categoryIds.map((el) => el.id);
    await axios
      .post("/ad-post", {
        title,
        desc,
        quote: price,
        images,
        userId,
        categoryIds: categoryIdsSelected,
      })
      .then((response) => {
        successToast("Ad posted successfully");
        navigate("/");
      })
      .catch((err) => {
        errorToast(err.message);
      });
  };

  const handleNewCategory = async () => {
    await axios
      .post("/category", { name: newCategory, userId })
      .then((response) => {
        // setCategories((prev) => [...prev, response.data]);
        successToast("New category added!");
        setUpdateState((prev) => !prev);
        setOpenCategory(false);
      })
      .catch((err) => {
        errorToast("Unable to add new category");
      });
  };

  useEffect(() => {
    async function getCategories() {
      await axios.get("/categories").then((response) => {
        const categoriesArr = response.data;
        setCategoryNames([]);
        setCategories(response.data);
        for (let i = 0; i < categoriesArr.length; ++i) {
          setCategoryNames((prev) => [...prev, categoriesArr[i].name]);
        }
      });
    }

    getCategories();
  }, [updateState]);

  return (
    <div className="mb-8">
      <div>
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openCategory}
            onClose={handleCloseCategory}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openCategory}>
              <div className={classes.paper}>
                <div className="text-center">
                  <h1>Add category</h1>
                </div>
                <div className="mt-4">
                  <div>
                    <CustomInput
                      label="Category name"
                      placeholder="Ex. mobile, glass"
                      className="border-2 border-coolGray px-2 py-1 w-full rounded text-md"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <CustomButton
                      text="Add"
                      className="w-full px-2 py-2 tracking-wider font-bold"
                      onClick={handleNewCategory}
                    />
                  </div>
                </div>
              </div>
            </Fade>
          </Modal>
        </div>

        {/* title */}
        <div className="text-center mt-7">
          <h1 className="font-bold">EDIT YOUR AD</h1>
        </div>

        <div className="sampleImg"></div>

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

            <div className="mt-4">
              <label className="text-coolGray">Categories</label>
              <br />

              <div className="flex">
                <div className="w-50p">
                  <CustomMultiselect
                    items={categoryNames}
                    className="rounded w-full text-xl"
                    onChange={(e) => {
                      const value = e.target.value;
                      const obj = categories.find((el) => el.name === value);
                      setCategoryIds((prev) => [...prev, obj]);
                    }}
                  />
                </div>

                <div>
                  <CustomButton
                    text="Add +"
                    className="px-2 py-1 ml-2 rounded h-full"
                    onClick={handleOpenCategory}
                  />
                </div>
              </div>

              <div className="mt-2">
                {categoryIds?.map((category) => (
                  <p
                    className="bg-primary w-fit text-white rounded px-2 cursor-pointer"
                    onClick={() =>
                      setCategoryIds((prev) =>
                        prev.filter((el) => el.id !== category.id)
                      )
                    }
                  >
                    {category.name}
                  </p>
                ))}
              </div>
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
                {photo1 ? (
                  <div
                    className="border-2 border-secondary rounded relative cursor-pointer"
                    style={{ height: "100px", width: "100px" }}
                  >
                    <img src={photo1} alt="photo1" />
                  </div>
                ) : (
                  <PhotoUpload handleFileChange={handleFileChange} index={1} />
                )}
              </div>
              <div>
                {photo2 ? (
                  <div
                    className="border-2 border-secondary rounded relative cursor-pointer"
                    style={{ height: "100px", width: "100px" }}
                  >
                    <img src={photo2} alt="photo1" />
                  </div>
                ) : (
                  <PhotoUpload handleFileChange={handleFileChange} index={2} />
                )}
              </div>
              <div>
                {photo3 ? (
                  <div
                    className="border-2 border-secondary rounded relative cursor-pointer"
                    style={{ height: "100px", width: "100px" }}
                  >
                    <img src={photo3} alt="photo1" />
                  </div>
                ) : (
                  <PhotoUpload handleFileChange={handleFileChange} index={3} />
                )}
              </div>
              <div>
                {photo4 ? (
                  <div
                    className="border-2 border-secondary rounded relative cursor-pointer"
                    style={{ height: "100px", width: "100px" }}
                  >
                    <img src={photo4} alt="photo1" />
                  </div>
                ) : (
                  <PhotoUpload handleFileChange={handleFileChange} index={4} />
                )}
              </div>
              <div>
                {photo5 ? (
                  <div
                    className="border-2 border-secondary rounded relative cursor-pointer"
                    style={{ height: "100px", width: "100px" }}
                  >
                    <img src={photo5} alt="photo1" />
                  </div>
                ) : (
                  <PhotoUpload handleFileChange={handleFileChange} index={5} />
                )}
              </div>
              <div>
                {photo6 ? (
                  <div
                    className="border-2 border-secondary rounded relative cursor-pointer"
                    style={{ height: "100px", width: "100px" }}
                  >
                    <img src={photo6} alt="photo1" />
                  </div>
                ) : (
                  <PhotoUpload handleFileChange={handleFileChange} index={6} />
                )}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <CustomButton
              text="Post now"
              className="px-4 py-3 text-lg tracking-widest font-bold"
              disabled={false}
              onClick={handleEditAd}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditAd;
