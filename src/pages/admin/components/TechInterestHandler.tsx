import React, { useEffect, useState } from "react";
import iTechInterest from "../../../interfaces/iTechInterest";
import TechInterest from "./TechInterest";

const TechInterestHandler = ({ tiData }: { tiData: iTechInterest[] }) => {
  console.log("Tech Interest handler");
  const [techInterests, setTechInterests] = useState<iTechInterest[]>(tiData);
  console.log("tiData");
  console.log(tiData);
  console.log("techInterests");
  console.log(techInterests);

  useEffect(() => {
    if (techInterests.length === 0) {
      addTechInterest("", 0, "");
    }
  }, [techInterests]);

  const addTechInterest = (name: string, interestLevel: number, icon: string) => {
    // add techInterest to tiData
    const newTechInterest = {
      id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      name: name,
      interestLevel: interestLevel,
      icon: icon,
    };
    console.log(newTechInterest);
    setTechInterests([...techInterests, newTechInterest]);
  };

  const removeTechInterest = (context: any) => {
    let self = context;
    console.log("self");
    console.log(self);

    console.log("removeTechInterest function");
    console.log(techInterests);

    // remove contact from contacts
    setTechInterests((prevInterests) => {
      return prevInterests.filter((techInterest) => techInterest.id !== self.state.key);
    });
  };

  return (
    <>
      {techInterests.map((techInterest: iTechInterest) => {
        const index = techInterests.indexOf(techInterest);
        const props = {
          techInterest: techInterest,
          remove: removeTechInterest,
        };
        return <TechInterest key={index} {...props} />;
      })}
      <div className="admin-me-form-add-remove-item" id="add-before-me-add-tech-interest-button">
        <button type="button" onClick={() => addTechInterest("", 0, "")}>
          +
        </button>
      </div>
    </>
  );
};

export default TechInterestHandler;
