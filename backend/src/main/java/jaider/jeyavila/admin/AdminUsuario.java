package jaider.jeyavila.admin;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/** Usuario que entra al panel /jeyadmin. La contraseña solo se guarda encriptada (BCrypt). */
@Entity
@Table(name = "admin_usuario")
public class AdminUsuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, unique = true, length = 120)
	private String email;

	@Column(name = "password_hash", nullable = false, length = 100)
	private String passwordHash;

	protected AdminUsuario() {
	}

	public AdminUsuario(String email, String passwordHash) {
		this.email = email;
		this.passwordHash = passwordHash;
	}

	public void cambiarPasswordHash(String passwordHash) {
		this.passwordHash = passwordHash;
	}

	public String getEmail() { return email; }
	public String getPasswordHash() { return passwordHash; }
}
