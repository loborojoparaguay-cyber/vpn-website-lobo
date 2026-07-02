// Admin Panel JavaScript

// Default credentials (CAMBIA ESTOS EN PRODUCCIÓN)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Check if user is logged in
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('admin_logged_in');
    if (isLoggedIn) {
        showDashboard();
        loadDashboardData();
    }
});

// Login Function
function login(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem('admin_logged_in', 'true');
        showDashboard();
        loadDashboardData();
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

// Logout Function
function logout() {
    localStorage.removeItem('admin_logged_in');
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
}

// Show Dashboard
function showDashboard() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'flex';
}

// Show Section
function showSection(section) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
    
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    
    // Show selected section
    let sectionId, title;
    switch(section) {
        case 'dashboard':
            sectionId = 'dashboardSection';
            title = 'Dashboard';
            loadDashboardData();
            break;
        case 'clients':
            sectionId = 'clientsSection';
            title = 'Gestión de Clientes';
            loadClients();
            break;
        case 'trials':
            sectionId = 'trialsSection';
            title = 'Solicitudes de Prueba';
            loadTrials();
            break;
        case 'alerts':
            sectionId = 'alertsSection';
            title = 'Alertas';
            loadAlerts();
            break;
    }
    
    document.getElementById(sectionId).style.display = 'block';
    document.getElementById('sectionTitle').textContent = title;
    
    // Add active class to clicked nav item
    event.target.classList.add('active');
}

// Load Dashboard Data
function loadDashboardData() {
    const clients = JSON.parse(localStorage.getItem('vpn_clients') || '[]');
    const today = new Date();
    
    // Calculate stats
    const totalClients = clients.length;
    const activeClients = clients.filter(c => new Date(c.expirationDate) > today).length;
    const pendingPayments = clients.filter(c => c.paymentStatus !== 'pagado').length;
    
    // Clients expiring in next 7 days
    const sevenDaysFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const expiringSoon = clients.filter(c => {
        const expDate = new Date(c.expirationDate);
        return expDate > today && expDate <= sevenDaysFromNow;
    }).length;
    
    // Update stats cards
    document.getElementById('totalClients').textContent = totalClients;
    document.getElementById('activeClients').textContent = activeClients;
    document.getElementById('expiringSoon').textContent = expiringSoon;
    document.getElementById('pendingPayments').textContent = pendingPayments;
    
    // Load recent alerts
    loadRecentAlerts();
}

// Load Recent Alerts
function loadRecentAlerts() {
    const clients = JSON.parse(localStorage.getItem('vpn_clients') || '[]');
    const today = new Date();
    const alertsContainer = document.getElementById('recentAlerts');
    
    let alertsHTML = '';
    let alertCount = 0;
    
    clients.forEach(client => {
        const expDate = new Date(client.expirationDate);
        const daysUntilExpiration = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
        
        // Expired
        if (daysUntilExpiration < 0) {
            alertsHTML += `
                <div class="alert danger" style="margin-bottom: 1rem;">
                    <div class="alert-content">
                        <h4>⚠️ Servicio Vencido</h4>
                        <p>${client.name} - Venció hace ${Math.abs(daysUntilExpiration)} días</p>
                    </div>
                </div>
            `;
            alertCount++;
        }
        // Expiring soon
        else if (daysUntilExpiration <= 7) {
            alertsHTML += `
                <div class="alert warning" style="margin-bottom: 1rem;">
                    <div class="alert-content">
                        <h4>⏰ Vence Pronto</h4>
                        <p>${client.name} - Vence en ${daysUntilExpiration} días</p>
                    </div>
                </div>
            `;
            alertCount++;
        }
        
        // Payment pending
        if (client.paymentStatus === 'pendiente' || client.paymentStatus === 'parcial') {
            alertsHTML += `
                <div class="alert warning" style="margin-bottom: 1rem;">
                    <div class="alert-content">
                        <h4>💰 Pago ${client.paymentStatus === 'parcial' ? 'Parcial' : 'Pendiente'}</h4>
                        <p>${client.name} - ${client.plan}</p>
                    </div>
                </div>
            `;
            alertCount++;
        }
        
        if (alertCount >= 5) return;
    });
    
    if (alertsHTML === '') {
        alertsHTML = '<div class="empty-state"><i class="fas fa-check-circle"></i><p>No hay alertas</p></div>';
    }
    
    alertsContainer.innerHTML = alertsHTML;
}

// Load Clients
function loadClients() {
    const clients = JSON.parse(localStorage.getItem('vpn_clients') || '[]');
    const tbody = document.getElementById('clientsTableBody');
    
    if (clients.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="empty-state"><i class="fas fa-users"></i><p>No hay clientes registrados</p></td></tr>';
        return;
    }
    
    tbody.innerHTML = clients.map((client, index) => {
        const status = getClientStatus(client);
        const paymentBadge = getPaymentBadge(client.paymentStatus);
        
        return `
            <tr>
                <td>${client.name}</td>
                <td><a href="https://wa.me/${client.whatsapp.replace(/\D/g, '')}" target="_blank">${client.whatsapp}</a></td>
                <td>${client.plan}</td>
                <td>${formatDate(client.activationDate)}</td>
                <td>${formatDate(client.expirationDate)}</td>
                <td>${paymentBadge}</td>
                <td>$${client.amount || '0.00'}</td>
                <td>${status.badge}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon edit" onclick="editClient(${index})" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon whatsapp" onclick="contactClient('${client.whatsapp}')" title="WhatsApp">
                            <i class="fab fa-whatsapp"></i>
                        </button>
                        <button class="btn-icon delete" onclick="deleteClient(${index})" title="Eliminar">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// Get Client Status
function getClientStatus(client) {
    const today = new Date();
    const expDate = new Date(client.expirationDate);
    const daysUntilExpiration = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiration < 0) {
        return {
            badge: '<span class="badge badge-danger">Vencido</span>',
            status: 'vencido'
        };
    } else if (daysUntilExpiration <= 7) {
        return {
            badge: '<span class="badge badge-warning">Por Vencer</span>',
            status: 'por_vencer'
        };
    } else {
        return {
            badge: '<span class="badge badge-success">Activo</span>',
            status: 'activo'
        };
    }
}

// Get Payment Badge
function getPaymentBadge(status) {
    const badges = {
        'pagado': '<span class="badge badge-success">Pagado</span>',
        'pendiente': '<span class="badge badge-danger">Pendiente</span>',
        'parcial': '<span class="badge badge-warning">Parcial</span>'
    };
    return badges[status] || badges['pendiente'];
}

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

// Filter Clients
function filterClients() {
    const searchTerm = document.getElementById('searchClient').value.toLowerCase();
    const statusFilter = document.getElementById('filterStatus').value;
    const paymentFilter = document.getElementById('filterPayment').value;
    
    const clients = JSON.parse(localStorage.getItem('vpn_clients') || '[]');
    
    const filteredClients = clients.filter(client => {
        const matchesSearch = client.name.toLowerCase().includes(searchTerm) || 
                            client.whatsapp.includes(searchTerm);
        
        const status = getClientStatus(client).status;
        const matchesStatus = !statusFilter || status === statusFilter;
        
        const matchesPayment = !paymentFilter || client.paymentStatus === paymentFilter;
        
        return matchesSearch && matchesStatus && matchesPayment;
    });
    
    // Render filtered clients (similar to loadClients)
    const tbody = document.getElementById('clientsTableBody');
    tbody.innerHTML = filteredClients.map((client, index) => {
        const status = getClientStatus(client);
        const paymentBadge = getPaymentBadge(client.paymentStatus);
        
        return `
            <tr>
                <td>${client.name}</td>
                <td><a href="https://wa.me/${client.whatsapp.replace(/\D/g, '')}" target="_blank">${client.whatsapp}</a></td>
                <td>${client.plan}</td>
                <td>${formatDate(client.activationDate)}</td>
                <td>${formatDate(client.expirationDate)}</td>
                <td>${paymentBadge}</td>
                <td>$${client.amount || '0.00'}</td>
                <td>${status.badge}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon edit" onclick="editClient(${clients.indexOf(client)})" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon whatsapp" onclick="contactClient('${client.whatsapp}')" title="WhatsApp">
                            <i class="fab fa-whatsapp"></i>
                        </button>
                        <button class="btn-icon delete" onclick="deleteClient(${clients.indexOf(client)})" title="Eliminar">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// Open Client Modal
function openClientModal() {
    document.getElementById('clientModal').style.display = 'block';
    document.getElementById('clientModalTitle').innerHTML = '<i class="fas fa-user-plus"></i> Nuevo Cliente';
    document.getElementById('clientForm').reset();
    document.getElementById('clientId').value = '';
    
    // Set default dates
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('clientActivation').value = today;
}

// Close Client Modal
function closeClientModal() {
    document.getElementById('clientModal').style.display = 'none';
}

// Save Client
function saveClient(event) {
    event.preventDefault();
    
    const clientData = {
        name: document.getElementById('clientName').value,
        whatsapp: document.getElementById('clientWhatsapp').value,
        email: document.getElementById('clientEmail').value,
        plan: document.getElementById('clientPlan').value,
        activationDate: document.getElementById('clientActivation').value,
        expirationDate: document.getElementById('clientExpiration').value,
        paymentStatus: document.getElementById('clientPaymentStatus').value,
        amount: document.getElementById('clientAmount').value,
        notes: document.getElementById('clientNotes').value
    };
    
    let clients = JSON.parse(localStorage.getItem('vpn_clients') || '[]');
    const clientId = document.getElementById('clientId').value;
    
    if (clientId !== '') {
        // Edit existing client
        clients[parseInt(clientId)] = clientData;
    } else {
        // Add new client
        clients.push(clientData);
    }
    
    localStorage.setItem('vpn_clients', JSON.stringify(clients));
    
    closeClientModal();
    loadClients();
    loadDashboardData();
    
    alert('Cliente guardado exitosamente');
}

// Edit Client
function editClient(index) {
    const clients = JSON.parse(localStorage.getItem('vpn_clients') || '[]');
    const client = clients[index];
    
    document.getElementById('clientId').value = index;
    document.getElementById('clientName').value = client.name;
    document.getElementById('clientWhatsapp').value = client.whatsapp;
    document.getElementById('clientEmail').value = client.email || '';
    document.getElementById('clientPlan').value = client.plan;
    document.getElementById('clientActivation').value = client.activationDate;
    document.getElementById('clientExpiration').value = client.expirationDate;
    document.getElementById('clientPaymentStatus').value = client.paymentStatus;
    document.getElementById('clientAmount').value = client.amount || '';
    document.getElementById('clientNotes').value = client.notes || '';
    
    document.getElementById('clientModalTitle').innerHTML = '<i class="fas fa-user-edit"></i> Editar Cliente';
    document.getElementById('clientModal').style.display = 'block';
}

// Delete Client
function deleteClient(index) {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
        let clients = JSON.parse(localStorage.getItem('vpn_clients') || '[]');
        clients.splice(index, 1);
        localStorage.setItem('vpn_clients', JSON.stringify(clients));
        loadClients();
        loadDashboardData();
    }
}

// Contact Client via WhatsApp
function contactClient(whatsapp) {
    const phone = whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/${phone}`, '_blank');
}

// Load Trials
function loadTrials() {
    const trials = JSON.parse(localStorage.getItem('vpn_trials') || '[]');
    const tbody = document.getElementById('trialsTableBody');
    
    if (trials.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="empty-state"><i class="fas fa-gift"></i><p>No hay solicitudes de prueba</p></td></tr>';
        return;
    }
    
    tbody.innerHTML = trials.map((trial, index) => `
        <tr>
            <td>${formatDate(trial.date)}</td>
            <td>${trial.name}</td>
            <td><a href="https://wa.me/${trial.whatsapp.replace(/\D/g, '')}" target="_blank">${trial.whatsapp}</a></td>
            <td>${trial.email || '-'}</td>
            <td><span class="badge badge-info">${trial.plan}</span></td>
            <td>${trial.message || '-'}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon whatsapp" onclick="contactClient('${trial.whatsapp}')" title="WhatsApp">
                        <i class="fab fa-whatsapp"></i>
                    </button>
                    <button class="btn-icon delete" onclick="deleteTrial(${index})" title="Eliminar">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Delete Trial
function deleteTrial(index) {
    if (confirm('¿Eliminar esta solicitud?')) {
        let trials = JSON.parse(localStorage.getItem('vpn_trials') || '[]');
        trials.splice(index, 1);
        localStorage.setItem('vpn_trials', JSON.stringify(trials));
        loadTrials();
    }
}

// Clear Trials
function clearTrials() {
    if (confirm('¿Limpiar todas las solicitudes procesadas?')) {
        localStorage.setItem('vpn_trials', '[]');
        loadTrials();
    }
}

// Load Alerts
function loadAlerts() {
    const clients = JSON.parse(localStorage.getItem('vpn_clients') || '[]');
    const today = new Date();
    const alertsContainer = document.getElementById('alertsContainer');
    
    let alertsHTML = '';
    
    clients.forEach((client, index) => {
        const expDate = new Date(client.expirationDate);
        const daysUntilExpiration = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
        
        // Expired
        if (daysUntilExpiration < 0) {
            alertsHTML += `
                <div class="alert danger">
                    <div class="alert-content">
                        <h4>⚠️ Servicio Vencido</h4>
                        <p><strong>${client.name}</strong> - Plan ${client.plan}</p>
                        <p>Venció hace ${Math.abs(daysUntilExpiration)} días (${formatDate(client.expirationDate)})</p>
                    </div>
                    <button class="btn btn-icon whatsapp" onclick="contactClient('${client.whatsapp}')">
                        <i class="fab fa-whatsapp"></i>
                    </button>
                </div>
            `;
        }
        // Expiring soon
        else if (daysUntilExpiration <= 7) {
            alertsHTML += `
                <div class="alert warning">
                    <div class="alert-content">
                        <h4>⏰ Vence Pronto</h4>
                        <p><strong>${client.name}</strong> - Plan ${client.plan}</p>
                        <p>Vence en ${daysUntilExpiration} días (${formatDate(client.expirationDate)})</p>
                    </div>
                    <button class="btn btn-icon whatsapp" onclick="contactClient('${client.whatsapp}')">
                        <i class="fab fa-whatsapp"></i>
                    </button>
                </div>
            `;
        }
        
        // Payment issues
        if (client.paymentStatus === 'pendiente') {
            alertsHTML += `
                <div class="alert danger">
                    <div class="alert-content">
                        <h4>💰 Pago Pendiente</h4>
                        <p><strong>${client.name}</strong> - Plan ${client.plan}</p>
                        <p>No ha realizado el pago</p>
                    </div>
                    <button class="btn btn-icon whatsapp" onclick="contactClient('${client.whatsapp}')">
                        <i class="fab fa-whatsapp"></i>
                    </button>
                </div>
            `;
        }
        
        if (client.paymentStatus === 'parcial') {
            alertsHTML += `
                <div class="alert warning">
                    <div class="alert-content">
                        <h4>💵 Pago Parcial</h4>
                        <p><strong>${client.name}</strong> - Plan ${client.plan}</p>
                        <p>Pago incompleto - Monto: $${client.amount || '0.00'}</p>
                    </div>
                    <button class="btn btn-icon whatsapp" onclick="contactClient('${client.whatsapp}')">
                        <i class="fab fa-whatsapp"></i>
                    </button>
                </div>
            `;
        }
    });
    
    if (alertsHTML === '') {
        alertsHTML = '<div class="empty-state"><i class="fas fa-check-circle"></i><p>No hay alertas pendientes</p></div>';
    }
    
    alertsContainer.innerHTML = alertsHTML;
}

// Auto-calculate expiration date based on plan
document.getElementById('clientPlan')?.addEventListener('change', function() {
    const activationDate = document.getElementById('clientActivation').value;
    if (!activationDate) return;
    
    const activation = new Date(activationDate);
    let expiration = new Date(activation);
    
    switch(this.value) {
        case 'mensual':
            expiration.setMonth(expiration.getMonth() + 1);
            break;
        case 'trimestral':
            expiration.setMonth(expiration.getMonth() + 3);
            break;
        case 'anual':
            expiration.setFullYear(expiration.getFullYear() + 1);
            break;
    }
    
    document.getElementById('clientExpiration').value = expiration.toISOString().split('T')[0];
});

// Also recalculate when activation date changes
document.getElementById('clientActivation')?.addEventListener('change', function() {
    const plan = document.getElementById('clientPlan').value;
    if (!plan) return;
    
    const activation = new Date(this.value);
    let expiration = new Date(activation);
    
    switch(plan) {
        case 'mensual':
            expiration.setMonth(expiration.getMonth() + 1);
            break;
        case 'trimestral':
            expiration.setMonth(expiration.getMonth() + 3);
            break;
        case 'anual':
            expiration.setFullYear(expiration.getFullYear() + 1);
            break;
    }
    
    document.getElementById('clientExpiration').value = expiration.toISOString().split('T')[0];
});
