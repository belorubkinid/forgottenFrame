import SessionAccesser from "../components/SessionAccesser/SessionAccesser";

function sessionAccesserHelper(Component, session) {
  if (session) return Component;
  return <SessionAccesser />;
}

export default sessionAccesserHelper;
