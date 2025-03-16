<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class AuthController extends AbstractController
{
    #[Route('/auth/register', methods: ['POST'])]
    public function register(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager, UserRepository $userRepository, ValidatorInterface $validator): Response
    {
        $error_message = "Error during account creation: ";
        $data = json_decode($request->getContent(), true);

        if (!isset($data['email'], $data['password'])) {
            return $this->json(['error' => $error_message . 'Email and password required in request'], 400);
        }

        if (empty($data['email']) || empty($data['password'])) {
            return $this->json(['error' => $error_message . 'Email and password must not be empty in request'], 400);
        }

        if ($userRepository->findOneBy(['email' => $data['email']])) {
            return $this->json(['error' => $error_message . 'Email already associated to an account'], 400);
        }

        $user = new User();
        $user->setEmail($data['email']);
        $user->setPassword($passwordHasher->hashPassword($user, $data['password']));

        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            return $this->json(['error' => $error_message . $errors[0]->getMessage()], 400);
        }

        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json(['message' => 'Account created'], 201);
    }

    #[Route('/auth/me', methods: ['GET'])]
    public function profile(#[CurrentUser] ?User $user): Response
    {
        $error_message = "Error retrieving account information: ";

        if (!$user) {
            return $this->json(['error' => $error_message . 'Not authenticated'], 401);
        }

        return $this->json($user);
    }
}