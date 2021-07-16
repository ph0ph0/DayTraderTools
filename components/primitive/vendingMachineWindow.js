import React from "react";
import styled from "styled-components";

const VendingMachineWindow = ({ ...props }) => {
  return (
    <div {...props}>
      <WindowWrapper />
    </div>
  );
};

const WindowWrapper = styled(Window);

const VendingMachineWindowWrapper = styled(VendingMachineWindow)``;

export default VendingMachineWindowWrapper;
