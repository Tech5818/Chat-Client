import styled from "styled-components";
import { IUsers } from "../../types/User";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../utils/client";

export const UserList = ({ users }: { users?: IUsers[] }) => {
  const { data } = useQuery<IUsers[]>({
    queryKey: ["chat-user-data"],
    queryFn: async () => {
      const queryString = users!.map((value) => `id=${value.id}`).join("&");
      const response = await client.get(`/user/getUsers?${queryString}`);

      return response.data.data;
    },
    enabled: !!users,
  });
  return (
    <>
      <Container>
        {data &&
          data!.map((value, idx) => (
            <UserBox key={idx}>{value.username}</UserBox>
          ))}
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 300px;
  border-right: 1px solid #dcdcdc;
  padding: 30px;
`;
const UserBox = styled.div`
  padding: 20px;
`;
