import useCommunityViewStore from "../../hooks/useCommunityViewStore";
import InternalBoard from "./InternalBoard";

export default function CommunityPanel() {
  const { selectedCommunityView } = useCommunityViewStore();

  switch (selectedCommunityView) {
    case "internal-board":
      return <InternalBoard />;
    default:
      return (
        <div style={{ padding: 20, color: "#888" }}>게시판을 선택하세요.</div>
      );
  }
}
