import {
  Modal,
  Box,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import FormControl from "@mui/material/FormControl/FormControl";
import Typography from "@mui/material/Typography";
import { ChangeEvent } from "react";
import User from "../models/user";

interface paramModal {
  openModal: boolean;
  closeModal: () => void;
  ontap: () => void;
}

interface paramModalDelete extends paramModal {
  name: string;
}

interface paramModalAddUser extends paramModal {
  fieldController: {
    fieldValue: User;
    onChange: (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
  };
}

const ModalDelete = (param: paramModalDelete) => {
  return (
    <Modal
      open={param.openModal}
      onClose={param.closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        component="form"
        className="space-y-[32px]"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          bgcolor: "background.paper",
          p: "40px 32px",
          borderRadius: "10px",
          margin: "0 auto",
          textAlign: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <Typography
          variant="body1"
          fontWeight={500}
          sx={{ width: "30ch", marginInline: "auto" }}
        >
          Apakah anda yakin ingin menghapus data "{param.name}"?
        </Typography>

        <div className="grid grid-cols-2 gap-[16px]">
          <Button onClick={param.closeModal}>Batal</Button>
          <Button onClick={param.ontap} variant="contained">
            Hapus
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

const ModalAddUser = (param: paramModalAddUser) => {
  return (
    <Modal
      open={param.openModal}
      onClose={param.closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        component="form"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50vw",
          bgcolor: "background.paper",
          p: "40px 32px",
          borderRadius: "10px",
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h6" fontWeight={500} style={{ gridColumn: "1/3" }}>
          Pengguna Baru
        </Typography>
        <FormControl
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "30px",
            my: "26px",
          }}
        >
          <TextField
            required
            name="name"
            id="standard-required"
            label="Nama"
            value={param.fieldController.fieldValue.name}
            variant="standard"
            onChange={param.fieldController.onChange}
          />
          <TextField
            required
            name="email"
            id="standard-required"
            label="E-mail"
            value={param.fieldController.fieldValue.email}
            variant="standard"
            onChange={param.fieldController.onChange}
          />
          <div>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              value={param.fieldController.fieldValue.gender}
              name="gender"
              onChange={param.fieldController.onChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </div>
          <div>
            <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
            <RadioGroup
              row
              itemType="status"
              aria-labelledby="demo-radio-buttons-group-label"
              value={param.fieldController.fieldValue.status}
              name="status"
              onChange={param.fieldController.onChange}
            >
              <FormControlLabel
                value="active"
                control={<Radio />}
                label="Aktif"
              />
              <FormControlLabel
                value="inactive"
                control={<Radio />}
                label="Tidak Aktif"
              />
            </RadioGroup>
          </div>
        </FormControl>
        <Button
          onClick={(e) => {
            e.preventDefault();

            param.ontap.call(e);
          }}
          variant="contained"
          sx={{ alignSelf: "flex-start" }}
        >
          {param.fieldController.fieldValue.id === undefined
            ? "Tambah"
            : "Edit"}{" "}
          Pengguna
        </Button>
      </Box>
    </Modal>
  );
};

export { ModalDelete, ModalAddUser };
