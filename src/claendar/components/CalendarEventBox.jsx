
export const CalendarEventBox = ({ event }) => {
    // console.log( props )

    const { title, user } = event;

  return (
    <>
        <strong>{ title }</strong> - { user.name }
    </>
    )
}
