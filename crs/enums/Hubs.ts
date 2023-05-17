import { ChatHub, CodeSharingHub, MeetingHub } from "../hubs";
import { Endpoints } from "../enums";

const Hubs = [
  {
    type: ChatHub,
    endpoint: Endpoints.ChatHub
  },
  {
    type: CodeSharingHub,
    endpoint: Endpoints.CodeSharingHub
  },
  {
    type: MeetingHub,
    endpoint: Endpoints.MeetingHub
  }
];

export default Hubs;