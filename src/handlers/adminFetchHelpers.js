export async function blockUsers(selectedUserIds) {
    try {
        const response = await fetch('http://localhost:5000/api/users/block-users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedUserIds, status: 'blocked' }),
        });
        if (response.ok) {
        console.log('User(s) blocked successfully.');
        } else {
        console.error('Error blocking user(s).');
        }
    } catch (error) {
        console.error('Error blocking user(s):', error);
    }
}

export async function unblockUsers(selectedUserIds) {
    try {
        const response = await fetch('http://localhost:5000/api/users/unblock-users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedUserIds, status: 'active' }),
        });
        if (response.ok) {
        console.log('User(s) unblocked successfully.');
        } else {
        console.error('Error unblocking user(s).');
        }
    } catch (error) {
        console.error('Error unblocking user(s):', error);
    }
}

export async function deleteUsers(selectedUserIds) {
    try {
        const response = await fetch('http://localhost:5000/api/users/delete-users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedUserIds }),
        });
        if (response.ok) {
        console.log('User(s) deleted successfully.');
        } else {
        console.error('Error deleting user(s).');
        }
    } catch (error) {
        console.error('Error deleting user(s):', error);
    }
}