import { useEffect, useState, useCallback } from "react";

export const useSectionsState = (initialSections, isEditing, currentRecord) => {
  const [sections, setSections] = useState(initialSections);

  useEffect(() => {
    if (isEditing && currentRecord) {
      setSections(currentRecord.sections);
    }
  }, [currentRecord, isEditing]);

  const handleSectionInputChange = useCallback((e, index) => {
    setSections((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections[index].sectionName = e.target.value;
      return updatedSections;
    });
  }, []);

  const handleInputChange = useCallback(
    (sectionIndex, itemIndex, field, value) => {
      setSections((prevSections) => {
        const updatedSections = [...prevSections];
        updatedSections[sectionIndex].items[itemIndex][field] = value;
        return updatedSections;
      });
    },
    []
  );

  const addRow = useCallback((sectionIndex) => {
    setSections((prevSections) => {
      const newSections = [...prevSections];
      newSections[sectionIndex].items.push({
        id: newSections[sectionIndex].items.length + 1,
        itemName: "",
        description: "",
        unit: "",
        quantity: "",
        price: "",
        margin: "",
      });
      return newSections;
    });
  }, []);

  const removeRow = useCallback((sectionIndex, itemIndex) => {
    setSections((prevSections) => {
      const newSections = [...prevSections];
      newSections[sectionIndex].items.splice(itemIndex, 1);
      return newSections;
    });
  }, []);

  const addSection = useCallback(() => {
    setSections((prevSections) => [
      ...prevSections,
      {
        id: prevSections.length + 1,
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
  }, []);

  return {
    sections,
    handleSectionInputChange,
    handleInputChange,
    addRow,
    removeRow,
    addSection,
  };
};
