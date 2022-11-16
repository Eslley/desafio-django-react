import { ArrowBack } from "@mui/icons-material"
import { IconButton } from "@mui/material"

function PageTitle({
  icon, title, handleBack
}) {
  return (
    <h4 style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      fontSize: '26px',
      color: 'white'
    }}>
      {handleBack != undefined &&
        <IconButton onClick={handleBack} sx={{ color: 'white', position: 'absolute', left: '4%' }} aria-label="back">
          <ArrowBack />
        </IconButton>
      }

      <div>
        {icon}
        {title}
      </div>
    </h4>
  )
}

export default PageTitle