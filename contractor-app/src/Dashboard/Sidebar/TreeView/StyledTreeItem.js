import TreeItem from "@material-ui/lab/TreeItem";

export default function StyledTreeItem(props) {
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
        label={
          <div className="labelRoot">
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
  }