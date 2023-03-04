import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ChangeEvent, useEffect, useState } from "react";
import { tableHeads } from "../../components/table_head";
import TableController from "../../services/controller/controller_table";
import "./App.scss";
import { ModalAddUser, ModalDelete } from "../../components/modal";
import User from "../../models/user";
import { StyledTableRow, StyledTableCell } from "../../utils/style_table";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import grey from "@mui/material/colors/grey";

function App() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataUser, setDataUser] = useState<User[]>([]);
  const [loginedUser, loading] = useAuthState(auth);

  const navigate = useNavigate();
  let _controller = new TableController();
  const initUser: User = {
    name: "",
    email: "",
    gender: "male",
    status: "active",
  };

  const [modalBuatEditUser, setModalBuatEditUser] = useState(false);
  const handelModalBuatEditUser = () =>
    setModalBuatEditUser(!modalBuatEditUser);

  const [modalHapusUser, setModalHapusUser] = useState(false);
  const handelModalHapusUser = () => setModalHapusUser(!modalHapusUser);

  const [fieldUser, setFieldUser] = useState<User>(initUser);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFieldUser((field): User => {
      return {
        ...field,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      var result: User[] = await _controller.getAllUser();
      setDataUser(result);
    };

    fetchData().catch(console.error);
    console.log(dataUser);
  }, [dataUser]);

  if (!loginedUser) navigate("/login");
  if (loginedUser)
    return (
      <div className="App  ">
        {loginedUser && (
          <div
            className=""
            style={{ borderBottom: `0.5px solid ${grey[300]}` }}
          >
            <section className="flex items-center justify-between py-[10px] max-w-[1200px] m-[auto]">
              <Typography variant="subtitle1" fontWeight={400}>
                CRUD
              </Typography>
              <div className="flex items-center gap-[16px]">
                <Typography variant="body2">
                  {loginedUser.displayName}
                </Typography>
                <img
                  // style={{ marginLeft: "auto" }}
                  referrerPolicy="no-referrer"
                  className="w-8 rounded-full"
                  src={loginedUser.photoURL ?? ""}
                  alt=""
                />
                <IconButton
                  onClick={() => {
                    auth.signOut();
                    navigate("/login");
                  }}
                >
                  <MdLogout />
                </IconButton>
              </div>
            </section>
          </div>
        )}

        <main className="max-w-[1200px] m-[auto] pt-[40px] space-y-[32px]">
          {/* title & add btn */}
          <section className="flex justify-between">
            <Typography variant="h6" fontWeight="500">
              Data User
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                handelModalBuatEditUser();
                setFieldUser(initUser);
              }}
            >
              Tambah User
            </Button>
          </section>

          {/* table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>{tableHeads}</TableHead>
              {dataUser.length > 0 && (
                <TableBody>
                  {(dataUser.length > 0
                    ? dataUser.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : dataUser
                  ).map((data, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{data.id}</StyledTableCell>
                      <StyledTableCell>{data.name}</StyledTableCell>
                      <StyledTableCell>{data.email}</StyledTableCell>
                      <StyledTableCell>{data.gender}</StyledTableCell>
                      <StyledTableCell>{data.status}</StyledTableCell>
                      <StyledTableCell>
                        <IconButton
                          aria-label="edit"
                          onClick={() => {
                            setModalBuatEditUser(true);
                            setFieldUser(data);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            setModalHapusUser(true);
                            setFieldUser(data);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              )}
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    // colSpan={3}
                    count={dataUser.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    // ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </main>

        {/* modal add user */}
        <ModalAddUser
          openModal={modalBuatEditUser}
          closeModal={handelModalBuatEditUser}
          fieldController={{
            fieldValue: fieldUser,
            onChange: handleChangeInput,
          }}
          ontap={() => {}}
        />

        {/* modal delete user */}
        <ModalDelete
          openModal={modalHapusUser}
          closeModal={handelModalHapusUser}
          name={fieldUser.name}
          ontap={() => {}}
        />
      </div>
    );

  return <h1>Loading...</h1>;
}

export default App;
