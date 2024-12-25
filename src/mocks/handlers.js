import { http, HttpResponse, delay } from 'msw';

import { shoppinglistData } from './shoppinglistData';

export const handlers = [
    http.get('http://localhost:3000/api/shoppinglist/get', async ({ request }) => {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        const user = url.searchParams.get('user');
        const list = shoppinglistData.find(list => list.id === id)
        await delay(1000);
        if(!list){
            return HttpResponse.json({ message: 'List not found.' }, { status: 404 });
        } else if(!list.members.includes(user) && list.owner !== user){
            return HttpResponse.json({ message: 'You are not allowed to view this list.' }, { status: 403 });
        }
        return HttpResponse.json(list);
    }),
    http.put('http://localhost:3000/api/shoppinglist/update', async ({ request }) => {
        const { id, list, user } = await request.json();
        const index = shoppinglistData.findIndex(l => l.id === id);
        await delay(100);
        if(index === -1){
            return HttpResponse.json({ message: 'List not found.' }, { status: 404 });
        }
        if(list.action){
            const { action, ...updatedList } = list;
            if(action === 'item'){
                shoppinglistData[index] = updatedList;
            } else if(action === 'deleteSelf'){
                shoppinglistData[index] = updatedList;
            }
        } else {
            if (list.owner !== user) return HttpResponse.json({ message: 'You are not allowed to update this list.' }, { status: 403 });
            shoppinglistData[index] = list;
        }
        return HttpResponse.json(list);
    }),
    http.delete('http://localhost:3000/api/shoppinglist/delete', async ({ request }) => {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        const user = url.searchParams.get('user');
        const list = shoppinglistData.find(list => list.id === id);
        await delay(100);
        if(!list){
            return HttpResponse.json({ message: 'List not found.' }, { status: 404 });
        } else {
            if(list.owner !== user){
                return HttpResponse.json({ message: 'You are not allowed to delete this list.' }, { status: 403 });
            }
            const listIndex = shoppinglistData.findIndex(l => l.id === id);
            if(listIndex === -1){
                return HttpResponse.json({ message: 'Second delete' });
            }
            shoppinglistData.splice(listIndex, 1);
            return HttpResponse.json({});
        }
    }),
    http.get('http://localhost:3000/api/shoppinglist/list', async ({ request }) => {
        const url = new URL(request.url);
        const user = url.searchParams.get('user');
        const archived = url.searchParams.get('archived') === 'true';
        await delay(100);
        if(!user){
            return HttpResponse.json(shoppinglistData);
        }
        return HttpResponse.json(shoppinglistData.filter(list => (list.members.includes(user) || list.owner === user) && list.archived === archived));
    }),
    http.post('http://localhost:3000/api/shoppinglist/create', async ({ request }) => {
        const { list } = await request.json();
        await delay(100);
        shoppinglistData.push(list);
        return HttpResponse.json(list);
    })
];