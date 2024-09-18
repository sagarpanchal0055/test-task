import React, { useCallback, useMemo, useState } from "react";
import { Box, Button, Card } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import "./TableForm.css";
import { addEstimate, updateEstimate } from "../../utils/apis/estimate";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { calculateTotals, validateSections } from "../../utils/helper";
import { useSectionsState } from "../../hooks/useSectionsState";
import EstimateItemRow from "./EstimateItemRow";

const initialSections = [
  {
    id: 1,
    sectionName: "",
    items: [
      { id: 1, itemName: "", description: "", unit: "", quantity: "", price: "", margin: "" },
      { id: 2, itemName: "", description: "", unit: "", quantity: "", price: "", margin: "" },
      { id: 3, itemName: "", description: "", unit: "", quantity: "", price: "", margin: "" },
    ],
  },
];

const EstimateTableForm = ({ isEditing = false, currentRecord }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);

  const { sections, handleSectionInputChange, handleInputChange, addRow, removeRow, addSection } = useSectionsState(initialSections, isEditing, currentRecord);

  const { subTotal, totalMargin, totalAmount } = useMemo(() => calculateTotals(sections), [sections]);
  
  const submitHandler = useCallback(async (e) => {
    e.preventDefault();
  
    const validationErrors = validateSections(sections);
    setErrors(validationErrors);
  
    if (validationErrors.length !== 0) {
      return;
    }
  
    const commonPayload = {
      lastModified: format(new Date(), "dd MMM yyyy"),
      sections,
    };
  
    try {
      if (isEditing) {
        const updatePayload = {
          ...currentRecord,
          ...commonPayload,
        };
        
        await updateEstimate(currentRecord.id, updatePayload);
        toast.success(t("Estimate updated successfully")); 
      } else {
        const createPayload = {
          version: "00001",
          project: "Christine Brooks",
          client: "089 Kutch green",
          createdDate: format(new Date(), "dd MMM yyyy"),
          status: "Created",
          ...commonPayload,
        };
        
        await addEstimate(createPayload);
        toast.success(t("Estimate created successfully"));
      }
  
      navigate("/estimates");
    } catch (error) {
      toast.error(t("An error occurred while processing the estimate"));
      console.error("Error in submitHandler:", error);
    }
  }, [sections, isEditing, currentRecord, navigate, t]);

  return (
    <Card sx={{ p: "16px" }}>
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
              <div>{t("ITEM")}</div>
              <div>{t("DESCRIPTION")}</div>
              <div>{t("UNIT")}</div>
              <div>{t("QUANTITY")}</div>
              <div>{t("PRICE")} ($)</div>
              <div>{t("MARGIN")} (+/-)</div>
            </div>
          </div>
          <div style={{ padding: "0 20px" }}>
            {sections.map((section, index) => {
              let total = section.items.reduce((acc, cur) => {
                let totalPrice = cur.quantity && cur.price ? parseInt(cur.quantity) * parseInt(cur.price) : 0;
                if (cur.margin) {
                  totalPrice = totalPrice + (cur.quantity && cur.price ? (totalPrice * parseInt(cur.margin)) / 100 : 0);
                }
                acc = acc + totalPrice
                return acc
              }, 0)
              return (
                <React.Fragment key={index}>
                  {/* Section Name and Total Amount */}
                  <div
                    style={{
                      display: "flex",
                      position: "relative",
                      justifyContent: "space-between",
                    }}
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
                        bgcolor={"secondary.main"}
                        sx={{ cursor: "pointer" }}
                      >
                        <AddCircleRoundedIcon
                          sx={{ zIndex: "10000 !important" }}
                          onClick={addSection}
                        />
                      </Box>

                      <Box display={"flex"} flexDirection={"column"}>
                        <input
                          type="text"
                          value={section.sectionName}
                          placeholder={t("SECTION_NAME")}
                          className="section-name-input"
                          onChange={(e) =>
                            handleSectionInputChange(e, index)
                          }
                          />
                        {errors.find((error) => error.sectionIndex === index)?.sectionErrors?.sectionName && (
                          <span className="error">{errors.find((error) => error.sectionIndex === index)?.sectionErrors?.sectionName}</span>
                        )}
                      </Box>
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
                        value={total ? total : 0.00}
                        className="total-amount-input"
                        readOnly
                      />
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        bgcolor={"secondary.main"}
                      >
                        $
                      </Box>
                    </div>
                  </div>

                  {/* Item Rows */}
                  {section.items.map((item, itemIndex) => (
                    <EstimateItemRow
                      key={itemIndex}
                      item={item}
                      index={index}
                      itemIndex={itemIndex}
                      handleInputChange={handleInputChange}
                      errors={errors}
                      addRow={addRow}
                      removeRow={removeRow}
                      t={t}
                    />
                  ))}
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
              <p>{t("SUB_TOTAL")}:</p>
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
              <p>{t("TOTAL_MARGIN")}:</p>
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
              <p>{t("TOTAL_AMOUNT")}:</p>
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
            {t("CANCEL")}
          </Button>
          <Button
            size="large"
            variant="contained"
            color="primary"
            sx={{ width: 200, height: 50 }}
            onClick={submitHandler}
          >
            {t("SUBMIT")}
          </Button>
        </Box>
    </Card>
  );
};

export default EstimateTableForm;
