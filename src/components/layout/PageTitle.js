function PageTitle({
    icon, title
}) {
  return (
    <h4 style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '26px',
        color: "white"
    }}>
        {icon}
        {title}
    </h4>
  )
}

export default PageTitle