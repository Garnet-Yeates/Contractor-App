import TreeItem from "@material-ui/lab/TreeItem";
import { forwardRef } from "react";

const StyledTreeItem = forwardRef((props, ref) => {
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgColor,
    ...other
  } = props;

  return (
    <TreeItem
      ref={ref}
      label={
        <div
          className="labelRoot">
          <LabelIcon color="inherit" className="labelIcon" />
          <span className="labelText">
            {labelText}
          </span>
          <span color="inherit">
            {labelInfo}
          </span>
        </div>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor
      }}
      classes={{

      }}
      {...other}
    />
  );
})

export default StyledTreeItem;