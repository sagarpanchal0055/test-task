import React, { useEffect, useState } from "react";
import { Box, Button, Paper } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import "./TableForm.css";
import { addEstimate, updateEstimate } from "../../utils/apis/estimate";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const EditEstimateTableForm = ({ currentRecord }) => {
  const navigate = useNavigate();

  const [sections, setSections] = useState([
    {
      id: 1,
      sectionName: "",
      items: [
        {
          id: 1,
          itemName: "",
          description: "",
          unit: "",
          quantity: 0,
          price: 0,
          margin: 0,
        },
        {
          id: 2,
          itemName: "",
          description: "",
          unit: "",
          quantity: 0,
          price: 0,
          margin: 0,
        },
        {
          id: 3,
          itemName: "",
          description: "",
          unit: "",
          quantity: 0,
          price: 0,
          margin: 0,
        },
      ],
    },
  ]);

  useEffect(() => {
    if (currentRecord) {
      setSections(currentRecord.sections)
    }
  }, [currentRecord])
  

  const handleInputChange = (sectionIndex, itemIndex, field, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].items[itemIndex][field] = value;

    setSections(updatedSections);
  };

  const addRow = (sectionIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].items.push({
      id: newSections[sectionIndex].items.length + 1,
      itemName: "",
      description: "Item Description",
      unit: "",
      quantity: "",
      price: "",
      margin: "",
    });
    setSections(newSections);
  };

  const removeRow = (sectionIndex, itemIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].items.splice(itemIndex, 1);
    setSections(newSections);
  };

  const addSection = () => {
    setSections([
      ...sections,
      {
        id: sections.length + 1,
        sectionName: "",
        totalAmount: "",
        items: [
          {
            id: 1,
            itemName: "",
            description: "",
            unit: "",
            quantity: "",
            price: "",
            margin: "",
            total: "",
          },
        ],
      },
    ]);
  };

  let subTotal = 0
  let totalMargin = 0
  let totalAmount = 0
  sections.forEach(section => {
    section.items.forEach((item) => {
      let margin = 0
      let totalPrice = item.quantity && item.price ? parseInt(item.quantity) * parseInt(item.price) : 0;
      if (item.margin && item.quantity && item.price) {
        margin = (totalPrice * parseInt(item.margin)) / 100;
      }
      subTotal = subTotal + totalPrice
      totalMargin = totalMargin + margin
      totalAmount = totalAmount + totalPrice + margin
    })
  })

  const submitHandler = async () => {
    const payload = {
      ...currentRecord,
      lastModified: format(new Date(), "dd MMM yyyy"),
      sections: sections
    }
    const response = await updateEstimate(currentRecord.id, payload);
    toast.success("Estimate created successfully");
    navigate("/estimates") 
  }

  return (
    <Box sx={{ padding: "20px" }}>
      <Paper sx={{ padding: "20px 0" }}>
        <div className="estimate-table">
          <div
            style={{
              width: "100%",
              marginBottom: "32px",
              paddingBottom: "8px",
              borderBottom: "1px solid #D5D5D5",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                fontWeight: 700,
                padding: "0 20px",
              }}
            >
              <div>ITEM</div>
              <div>DESCRIPTION</div>
              <div>UNIT</div>
              <div>QUANTITY</div>
              <div>PRICE ($)</div>
              <div>MARGIN (+/-)</div>
            </div>
          </div>
          <div style={{ padding: "0 20px" }}>
            {sections.map((section, sectionIndex) => {
              let total = section.items.reduce((acc, cur) => {
                let totalPrice = cur.quantity && cur.price ? parseInt(cur.quantity) * parseInt(cur.price) : 0;
                if (cur.margin) {
                  totalPrice = totalPrice + (cur.quantity && cur.price ? (totalPrice * parseInt(cur.margin)) / 100 : 0);
                }
                acc = acc + totalPrice
                return acc
              }, 0)
              return (
                <React.Fragment key={sectionIndex}>
                  {/* Section Name and Total Amount */}
                  <div
                    style={{
                      display: "flex",
                      position: "relative",
                      justifyContent: "space-between",
                    }}
                    className="section-header"
                  >
                    <Box
                      position={"absolute"}
                      top={"50%"}
                      width={"100%"}
                      height={"1px"}
                      bgcolor={"#949494"}
                    ></Box>
                    <div
                      style={{
                        display: "flex",
                        zIndex: "100 ",
                        width: "100%",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        bgcolor={"white"}
                      >
                        <AddCircleRoundedIcon
                          sx={{ zIndex: "10000 !important" }}
                          onClick={addSection}
                        />
                      </Box>

                      <input
                        type="text"
                        value={section.sectionName}
                        placeholder="Section Name"
                        className="section-name-input"
                        onChange={(e) =>
                          setSections((prevSections) => {
                            const updatedSections = [...prevSections];
                            updatedSections[sectionIndex].sectionName = e.target.value;
                            return updatedSections;
                          })
                        }
                      />
                    </div>
                    <div
                      style={{
                        zIndex: 100,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="number"
                        value={total}
                        className="total-amount-input"
                        readOnly
                      />
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        bgcolor={"white"}
                      >
                        $
                      </Box>
                    </div>
                  </div>

                  {/* Item Rows */}
                  {section.items.map((item, itemIndex) => {
                    let totalPrice =
                    item.quantity && item.price ? parseInt(item.quantity) * parseInt(item.price) : 0;
                    if (item.margin && item.quantity && item.price) {
                      totalPrice =
                        totalPrice + (totalPrice * parseInt(item.margin)) / 100;
                    }
                    return (
                      <div
                        style={{ display: "flex", padding: "16px", gap: "8px" }}
                        key={itemIndex}
                      >
                        <div>
                          <input
                            type="text"
                            value={item.itemName}
                            placeholder="Item Name"
                            className="input-field"
                            onChange={(e) =>
                              handleInputChange(sectionIndex, itemIndex, "itemName", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={item.description}
                            placeholder="Item Description"
                            className="input-field"
                            onChange={(e) =>
                              handleInputChange(sectionIndex, itemIndex, "description", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={item.unit}
                            placeholder="Unit"
                            className="input-field"
                            onChange={(e) =>
                              handleInputChange(sectionIndex, itemIndex, "unit", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <input
                            type="number"
                            value={item.quantity}
                            placeholder="Quantity"
                            className="input-field"
                            onChange={(e) =>
                              handleInputChange(sectionIndex, itemIndex, "quantity", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <input
                            type="number"
                            value={item.price}
                            placeholder="Price"
                            className="input-field"
                            onChange={(e) =>
                              handleInputChange(sectionIndex, itemIndex, "price", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <input
                            type="number"
                            value={item.margin}
                            placeholder="Margin"
                            className="input-field"
                            onChange={(e) =>
                              handleInputChange(sectionIndex, itemIndex, "margin", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <input
                            type="number"
                            value={totalPrice}
                            className="input-field"
                            readOnly
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            alignItems: "center",
                          }}
                        >
                          <AddCircleRoundedIcon
                            onClick={() => addRow(sectionIndex)}
                          />
                          <RemoveCircleRoundedIcon
                            style={{ color: "grey" }}
                            onClick={() => removeRow(sectionIndex, itemIndex)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Total Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: "20px",
          }}
        >
          <div
            className="total-summary"
            style={{ width: "320px", display: "flex", flexDirection: "column" }}
          >
            <div
              style={{
                color: "#979797",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid lightgray",
              }}
            >
              <p>Sub Total:</p>
              <p>$ {subTotal}</p>
            </div>
            <div
              style={{
                color: "#979797",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid lightgray",
              }}
            >
              <p>Total Margin:</p>
              <p>$ {totalMargin}</p>
            </div>
            <div
              style={{
                display: "flex",
                fontWeight: "bold",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid lightgray",
              }}
            >
              <p>Total Amount:</p>
              <p>$ {totalAmount}</p>
            </div>
          </div>
        </Box>

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: "20px",
          }}
        >
          <Button
            size="large"
            variant="outlined"
            sx={{ marginRight: "32px", width: 200, height: 50 }}
            onClick={() => navigate("/estimates")}
          >
            Cancel
          </Button>
          <Button
            size="large"
            variant="contained"
            color="primary"
            sx={{ width: 200, height: 50 }}
            onClick={submitHandler}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default EditEstimateTableForm;
