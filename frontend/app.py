import streamlit as st
import requests
import os

API_URL = os.getenv("API_URL", "http://localhost:8000")

st.set_page_config(page_title="RegIntel AI Dashboard", layout="wide")

st.title("🛡️ RegIntel AI Compliance Dashboard")

# Session state for auth
if "token" not in st.session_state:
    st.session_state.token = None
    st.session_state.role = None
    st.session_state.username = None

# --- SIDEBAR: LOGIN ---
with st.sidebar:
    st.header("Authentication")
    if not st.session_state.token:
        username = st.text_input("Username")
        password = st.text_input("Password", type="password")
        if st.button("Login"):
            res = requests.post(f"{API_URL}/login", json={"username": username, "password": password})
            if res.status_code == 200:
                data = res.json()
                st.session_state.token = data["access_token"]
                # Mock decode
                st.session_state.username = username
                st.session_state.role = username # "admin" or "officer"
                st.success("Logged in successfully!")
                st.rerun()
            else:
                st.error("Invalid credentials")
    else:
        st.write(f"Logged in as: **{st.session_state.username}** ({st.session_state.role})")
        if st.button("Logout"):
            st.session_state.token = None
            st.session_state.role = None
            st.session_state.username = None
            st.rerun()

# --- MAIN CONTENT ---
if not st.session_state.token:
    st.info("Please login to access the dashboard. (admin/admin123 or officer/officer123)")
    st.stop()

headers = {"Authorization": f"Bearer {st.session_state.token}"}

tab1, tab2, tab3 = st.tabs(["Run Workflow", "Upload Evidence", "Audit Logs (Admin Only)"])

with tab1:
    st.subheader("Analyze New Regulation")
    regulation_text = st.text_area("Paste Regulation Text Here:", height=200)
    if st.button("Run AI Workflow"):
        with st.spinner("Agents are analyzing..."):
            res = requests.post(f"{API_URL}/run-workflow", json={"text": regulation_text}, headers=headers)
            if res.status_code == 200:
                data = res.json()
                if "error" in data:
                    st.error(data["error"])
                else:
                    st.success(f"Workflow completed by {data.get('executed_by')}")
                    st.json(data)
            else:
                st.error("Failed to connect to backend.")

with tab2:
    st.subheader("Submit Compliance Evidence")
    map_text = st.text_input("Target MAP to satisfy:")
    uploaded_file = st.file_uploader("Upload Evidence Document (PDF/Image)")
    if st.button("Validate Evidence") and uploaded_file and map_text:
        with st.spinner("Validating..."):
            res = requests.post(
                f"{API_URL}/upload-evidence", 
                json={"file_name": uploaded_file.name, "map_text": map_text},
                headers=headers
            )
            if res.status_code == 200:
                st.success("Validation Complete")
                st.json(res.json())
            else:
                st.error("Validation failed.")

with tab3:
    st.subheader("System Audit Logs")
    if st.session_state.role != "admin":
        st.warning("You do not have permission to view this tab. Admin access required.")
    else:
        if st.button("Fetch Logs"):
            res = requests.get(f"{API_URL}/audit-logs", headers=headers)
            if res.status_code == 200:
                logs = res.json()
                st.write(f"Found {len(logs)} records.")
                st.dataframe(logs)
            else:
                st.error(f"Access Denied: {res.text}")
