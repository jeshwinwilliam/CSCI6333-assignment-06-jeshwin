
// Author: Jeshwin William James

import React, { useEffect, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({ uri: "https://graphqlzero.almansi.me/api" }),
  cache: new InMemoryCache(),
});

const GET_USERS = gql`
  query GetUsers {
    users(options: { paginate: { page: 1, limit: 5 } }) {
      data {
        id
        name
        email
      }
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $name: String!) {
    updateUser(id: $id, input: { name: $name }) {
      id
      name
      email
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Fetch users using client.query (no hooks)
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    client
      .query({ query: GET_USERS })
      .then((result) => {
        if (!isMounted) return;
        const fetched = result?.data?.users?.data || [];
        setUsers(fetched);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdate = (id) => {
    const newName = window.prompt("Enter new name:", "Updated Name");
    if (!newName) return;

    setUpdating(true);
    client
      .mutate({
        mutation: UPDATE_USER,
        variables: { id, name: newName },
      })
      .then((result) => {
        console.log("Update mutation result:", result.data);
        setUsers((prev) =>
          prev.map((user) =>
            user.id === id ? { ...user, name: newName } : user
          )
        );
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert("Failed to update user. Check console for details.");
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    setDeleting(true);
    client
      .mutate({
        mutation: DELETE_USER,
        variables: { id },
      })
      .then((result) => {
        console.log("Delete mutation result:", result.data);
        setUsers((prev) => prev.filter((user) => user.id !== id));
      })
      .catch((err) => {
        console.error("Delete error:", err);
        alert("Failed to delete user. Check console for details.");
      })
      .finally(() => {
        setDeleting(false);
      });
  };

  if (loading && users.length === 0)
    return (
      <div style={styles.centerMessageCard}>
        <p style={styles.pillText}>Fetching users from GraphQL API…</p>
      </div>
    );
  if (error)
    return (
      <div style={styles.centerMessageCard}>
        <p style={styles.errorText}>Error: {error.message}</p>
      </div>
    );

  return (
    <div style={styles.cardGrid}>
      {users.map((user) => (
        <div key={user.id} style={styles.userCard}>
          <div style={styles.avatarCircle}>
            <span style={styles.avatarInitial}>
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </span>
          </div>
          <div style={styles.userInfo}>
            <h3 style={styles.userName}>{user.name}</h3>
            <p style={styles.userEmail}>{user.email}</p>
            <div style={styles.tagRow}>
              <span
                style={{
                  ...styles.tag,
                  background: "rgba(56,189,248,0.1)",
                  borderColor: "#38bdf8",
                }}
              >
                ID: {user.id}
              </span>
              <span
                style={{
                  ...styles.tag,
                  background: "rgba(129,140,248,0.12)",
                  borderColor: "#818cf8",
                }}
              >
                GraphQLZero User
              </span>
            </div>
          </div>
          <div style={styles.buttonRow}>
            <button
              onClick={() => handleUpdate(user.id)}
              style={{ ...styles.button, ...styles.updateButton }}
            >
              ✏️ Update Name
            </button>
            <button
              onClick={() => handleDelete(user.id)}
              style={{ ...styles.button, ...styles.deleteButton }}
            >
              🗑 Delete
            </button>
          </div>
        </div>
      ))}
      {(updating || deleting) && (
        <div style={styles.statusBar}>
          {updating && <span>Updating user…</span>}
          {deleting && <span>Deleting user…</span>}
        </div>
      )}
    </div>
  );
}

function GraphQLDemo() {
  return (
    <div style={styles.page}>
      <div style={styles.gradientBackground}></div>

      <main style={styles.mainContainer}>
        <header style={styles.headerCard}>
          <div>
            <p style={styles.smallLabel}>CSCI 6333 · Frontend Web Development</p>
            <h1 style={styles.title}>GraphQL + Apollo Demo</h1>
            <p style={styles.subtitle}>
              Query, update, and delete users from a public GraphQL API with a colourful,
              modern React layout.
            </p>
          </div>
          <div style={styles.authorBadge}>
            <span style={styles.authorLabel}>Created by</span>
            <span style={styles.authorName}>Jeshwin William James</span>
          </div>
        </header>

        <section style={styles.infoRow}>
          <div style={styles.infoCard}>
            <h2 style={styles.infoTitle}>Live GraphQL Operations</h2>
            <ul style={styles.infoList}>
              <li>📡 Fetch first 5 users with a GraphQL query.</li>
              <li>✏️ Update a user&apos;s name using a mutation.</li>
              <li>🗑 Delete a user using a mutation.</li>
              <li>⚡ React state keeps UI in sync even if API is fake.</li>
            </ul>
          </div>
          <div style={styles.infoCardSecondary}>
            <h2 style={styles.infoTitle}>Tech Stack</h2>
            <ul style={styles.infoChipRow}>
              <li style={styles.chip}>React</li>
              <li style={styles.chip}>Apollo Client (no hooks)</li>
              <li style={styles.chip}>GraphQLZero API</li>
              <li style={styles.chip}>Modern UI Layout</li>
            </ul>
          </div>
        </section>

        <section style={styles.usersSection}>
          <h2 style={styles.sectionTitle}>User List (Interactive)</h2>
          <p style={styles.sectionSubtitle}>
            Try updating names or deleting users to see how GraphQL mutations and React
            state work together.
          </p>
          <Users />
        </section>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    margin: 0,
    padding: "24px",
    fontFamily:
      '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    background: "radial-gradient(circle at top left, #1e293b 0, #020617 45%, #000 100%)",
    color: "#e5e7eb",
    position: "relative",
    boxSizing: "border-box",
  },
  gradientBackground: {
    position: "fixed",
    inset: 0,
    background:
      "radial-gradient(circle at 0% 0%, rgba(59,130,246,0.22), transparent 55%)," +
      "radial-gradient(circle at 100% 0%, rgba(236,72,153,0.18), transparent 55%)," +
      "radial-gradient(circle at 20% 80%, rgba(52,211,153,0.18), transparent 55%)",
    opacity: 0.9,
    zIndex: -1,
  },
  mainContainer: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  headerCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: "24px",
    padding: "24px 28px",
    borderRadius: "20px",
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,64,175,0.85))",
    border: "1px solid rgba(148,163,184,0.35)",
    boxShadow: "0 22px 45px rgba(15,23,42,0.7), 0 0 0 1px rgba(15,23,42,0.6)",
    backdropFilter: "blur(18px)",
    marginBottom: "20px",
  },
  smallLabel: {
    fontSize: "0.75rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#a5b4fc",
    marginBottom: "4px",
  },
  title: {
    fontSize: "2rem",
    margin: 0,
    color: "#f9fafb",
  },
  subtitle: {
    marginTop: "6px",
    marginBottom: 0,
    maxWidth: "32rem",
    fontSize: "0.95rem",
    color: "#cbd5f5",
  },
  authorBadge: {
    minWidth: "210px",
    padding: "14px 16px",
    borderRadius: "16px",
    background:
      "linear-gradient(135deg, rgba(236,72,153,0.14), rgba(129,140,248,0.22))",
    border: "1px solid rgba(251,113,133,0.7)",
    textAlign: "right",
  },
  authorLabel: {
    display: "block",
    fontSize: "0.7rem",
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    color: "#fecaca",
    marginBottom: "4px",
  },
  authorName: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "#fee2e2",
  },
  infoRow: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.3fr)",
    gap: "16px",
    marginBottom: "20px",
  },
  infoCard: {
    padding: "18px 20px",
    borderRadius: "18px",
    background: "rgba(15,23,42,0.9)",
    border: "1px solid rgba(148,163,184,0.4)",
    boxShadow: "0 18px 35px rgba(15,23,42,0.8)",
  },
  infoCardSecondary: {
    padding: "18px 20px",
    borderRadius: "18px",
    background:
      "linear-gradient(145deg, rgba(30,64,175,0.92), rgba(147,51,234,0.88))",
    border: "1px solid rgba(191,219,254,0.7)",
    boxShadow: "0 18px 35px rgba(30,64,175,0.8)",
  },
  infoTitle: {
    fontSize: "1.05rem",
    margin: "0 0 8px 0",
    color: "#e5e7eb",
  },
  infoList: {
    margin: 0,
    paddingLeft: "18px",
    fontSize: "0.9rem",
    color: "#e5e7eb",
    lineHeight: 1.5,
  },
  infoChipRow: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  chip: {
    fontSize: "0.8rem",
    padding: "4px 10px",
    borderRadius: "999px",
    border: "1px solid rgba(219,234,254,0.9)",
    background: "rgba(239,246,255,0.14)",
    color: "#f9fafb",
  },
  usersSection: {
    padding: "18px 20px 22px",
    borderRadius: "20px",
    background: "rgba(15,23,42,0.94)",
    border: "1px solid rgba(148,163,184,0.45)",
    boxShadow: "0 20px 40px rgba(15,23,42,0.9)",
    marginBottom: "24px",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "1.2rem",
    color: "#e5e7eb",
  },
  sectionSubtitle: {
    marginTop: "6px",
    marginBottom: "14px",
    fontSize: "0.9rem",
    color: "#9ca3af",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "14px",
    marginTop: "8px",
  },
  userCard: {
    position: "relative",
    padding: "14px 14px 44px",
    borderRadius: "16px",
    background:
      "linear-gradient(145deg, rgba(15,23,42,0.96), rgba(30,64,175,0.88))",
    border: "1px solid rgba(129,140,248,0.6)",
    boxShadow: "0 14px 28px rgba(15,23,42,0.9)",
    overflow: "hidden",
  },
  avatarCircle: {
    width: "40px",
    height: "40px",
    borderRadius: "999px",
    background:
      "radial-gradient(circle at 30% 0%, #22d3ee, #6366f1 45%, #a855f7 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "8px",
  },
  avatarInitial: {
    fontWeight: 700,
    fontSize: "1.1rem",
    color: "#f9fafb",
  },
  userInfo: {
    marginBottom: "10px",
  },
  userName: {
    margin: 0,
    fontSize: "1rem",
    color: "#e5e7eb",
  },
  userEmail: {
    margin: "2px 0 6px",
    fontSize: "0.8rem",
    color: "#cbd5f5",
    wordBreak: "break-all",
  },
  tagRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  },
  tag: {
    fontSize: "0.7rem",
    padding: "3px 8px",
    borderRadius: "999px",
    borderWidth: "1px",
    borderStyle: "solid",
    color: "#e5e7eb",
  },
  buttonRow: {
    position: "absolute",
    left: "12px",
    right: "12px",
    bottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    gap: "8px",
  },
  button: {
    flex: 1,
    fontSize: "0.75rem",
    padding: "6px 8px",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    fontWeight: 500,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.12s ease, box-shadow 0.12s ease, opacity 0.12s ease",
  },
  updateButton: {
    background:
      "linear-gradient(135deg, rgba(56,189,248,0.9), rgba(59,130,246,0.95))",
    color: "#0b1120",
    boxShadow: "0 8px 18px rgba(37,99,235,0.7)",
  },
  deleteButton: {
    background:
      "linear-gradient(135deg, rgba(248,113,113,0.92), rgba(239,68,68,0.98))",
    color: "#111827",
    boxShadow: "0 8px 18px rgba(239,68,68,0.75)",
  },
  centerMessageCard: {
    padding: "14px 16px",
    borderRadius: "14px",
    background: "rgba(15,23,42,0.96)",
    border: "1px dashed rgba(148,163,184,0.6)",
    textAlign: "center",
    fontSize: "0.9rem",
  },
  pillText: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "999px",
    background: "rgba(59,130,246,0.15)",
    color: "#bfdbfe",
  },
  errorText: {
    color: "#fecaca",
    fontWeight: 500,
  },
  statusBar: {
    gridColumn: "1 / -1",
    marginTop: "4px",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "0.75rem",
    background: "rgba(55,65,81,0.9)",
    color: "#e5e7eb",
    display: "flex",
    justifyContent: "center",
    gap: "12px",
  },
};

export default GraphQLDemo;
